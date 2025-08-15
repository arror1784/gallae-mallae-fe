export function getCurrentPosition(){
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true, // 가능하면 정확도 높은 위치 사용
                timeout: 10000,           // 10초 초과하면 실패
                maximumAge: 10000,            // 이전 위치 캐시 사용 안 함
            }
        );
    });
}
