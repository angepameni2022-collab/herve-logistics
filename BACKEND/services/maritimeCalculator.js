/**
 * Calculateur maritime basé sur la formule Haversine
 * Points de passage maritimes : Corée (Busan) -> Mer de Chine -> Détroit de Malacca -> Océan Indien -> Cap de Bonne-Espérance -> Golfe de Guinée (Douala)
 */

const WAYPOINTS = [
  { nom: "Busan, Corée du Sud", lat: 35.10, lng: 129.04 },
  { nom: "Mer de Chine orientale", lat: 25.00, lng: 122.50 },
  { nom: "Mer de Chine méridionale", lat: 10.00, lng: 110.00 },
  { nom: "Détroit de Malacca (Singapour)", lat: 1.25, lng: 103.80 },
  { nom: "Détroit de Malacca (Sortie)", lat: 5.50, lng: 95.30 },
  { nom: "Océan Indien Nord", lat: 2.00, lng: 85.00 },
  { nom: "Océan Indien Sud", lat: -15.00, lng: 65.00 },
  { nom: "Sud Madagascar", lat: -27.00, lng: 46.00 },
  { nom: "Cap de Bonne-Espérance", lat: -34.50, lng: 19.50 },
  { nom: "Côte Ouest Africaine (Namibie)", lat: -22.50, lng: 14.00 },
  { nom: "Golfe de Guinée", lat: 1.00, lng: 7.00 },
  { nom: "Douala, Cameroun", lat: 4.05, lng: 9.70 }
];

/**
 * Calcule la distance Haversine en kilomètres entre deux coordonnées géographiques (lat, lng)
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Construit l'itinéraire maritime complet en intégrant le départ, les étapes intermédiaires et l'arrivée
 */
function getMaritimeRoute(depart, arrivee) {
  const route = [{ lat: depart.lat, lng: depart.lng, nom: depart.nom || "Départ" }];
  
  // Utilise les waypoints clés s'ils ne sont pas doublons du départ ou de l'arrivée
  for (const wp of WAYPOINTS) {
    const dDepart = haversineDistance(wp.lat, wp.lng, depart.lat, depart.lng);
    const dArrivee = haversineDistance(wp.lat, wp.lng, arrivee.lat, arrivee.lng);
    if (dDepart > 150 && dArrivee > 150) {
      route.push(wp);
    }
  }

  route.push({ lat: arrivee.lat, lng: arrivee.lng, nom: arrivee.nom || "Arrivée" });
  return route;
}

/**
 * Calcule la distance totale le long d'une route de coordonnées
 */
function calculateRouteTotalDistance(route) {
  let total = 0;
  for (let i = 0; i < route.length - 1; i++) {
    total += haversineDistance(route[i].lat, route[i].lng, route[i + 1].lat, route[i + 1].lng);
  }
  return total;
}

/**
 * Trouve le segment maritime le plus proche de la position actuelle et calcule
 * la distance parcourue depuis le départ et la distance restante jusqu'à l'arrivée.
 */
function calculateMaritimeProgress(currentLat, currentLng, depart, arrivee, vitesseKmH = null) {
  const route = getMaritimeRoute(depart, arrivee);
  const totalKm = Math.round(calculateRouteTotalDistance(route));

  // Trouver le point le plus proche sur le tracé polygonal
  let minDistanceToRoute = Infinity;
  let bestSegmentIndex = 0;
  let distanceAlongRoute = 0;

  // Calcul cumulatif
  const cumulativeDistances = [0];
  for (let i = 0; i < route.length - 1; i++) {
    const segmentLen = haversineDistance(route[i].lat, route[i].lng, route[i + 1].lat, route[i + 1].lng);
    cumulativeDistances.push(cumulativeDistances[i] + segmentLen);
  }

  // Projection / distance au plus proche point
  for (let i = 0; i < route.length - 1; i++) {
    const p1 = route[i];
    const p2 = route[i + 1];

    // Distance aux extrémités
    const d1 = haversineDistance(currentLat, currentLng, p1.lat, p1.lng);
    const d2 = haversineDistance(currentLat, currentLng, p2.lat, p2.lng);
    const segLen = cumulativeDistances[i + 1] - cumulativeDistances[i];

    // Approximation linéaire sur la latitude/longitude du segment
    const t = Math.max(0, Math.min(1, ((currentLat - p1.lat) * (p2.lat - p1.lat) + (currentLng - p1.lng) * (p2.lng - p1.lng)) /
      ((p2.lat - p1.lat) ** 2 + (p2.lng - p1.lng) ** 2 || 1)));

    const projLat = p1.lat + t * (p2.lat - p1.lat);
    const projLng = p1.lng + t * (p2.lng - p1.lng);
    const dProj = haversineDistance(currentLat, currentLng, projLat, projLng);

    if (dProj < minDistanceToRoute) {
      minDistanceToRoute = dProj;
      bestSegmentIndex = i;
      distanceAlongRoute = cumulativeDistances[i] + t * segLen;
    }
  }

  let parcouru = Math.round(distanceAlongRoute);
  if (parcouru < 0) parcouru = 0;
  if (parcouru > totalKm) parcouru = totalKm;

  const restant = Math.max(0, totalKm - parcouru);
  const progression = totalKm > 0 ? Math.round((parcouru / totalKm) * 100) : 0;

  let heuresRestantes = 0;
  if (vitesseKmH && Number(vitesseKmH) > 0) {
    heuresRestantes = Math.round(restant / Number(vitesseKmH));
  }

  return {
    parcouru,
    restant,
    total: totalKm,
    progression,
    heuresRestantes
  };
}

module.exports = {
  haversineDistance,
  getMaritimeRoute,
  calculateRouteTotalDistance,
  calculateMaritimeProgress,
  WAYPOINTS
};
