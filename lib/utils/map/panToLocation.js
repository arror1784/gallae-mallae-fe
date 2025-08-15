
export function panToLocation(map,lng,lat){

    const projection = map.getProjection();

    const centerLatLng = new naver.maps.LatLng(lng, lat);

    const centerPoint = projection.fromCoordToPoint(centerLatLng);

    const zoom = map.getZoom();
    const scale = Math.pow(2, zoom); // 줌 레벨 기반 scale
    const pixelOffset = 140 / scale;

    const movedPoint = new naver.maps.Point(centerPoint.x, centerPoint.y + pixelOffset);

    const movedLatLng = projection.fromPointToCoord(movedPoint);

    map.panTo(movedLatLng);
}
