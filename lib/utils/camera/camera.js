export  async function camera(videoRef,setLoading) {
    setLoading(true)
    return  navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
        }
    })
        .then((stream) => {

            videoRef.current.srcObject = stream;
            setLoading(false)
            return stream
        })
        .catch((err) => {
            alert('사용자 거부 새로고침')
            console.error('카메라 접근 오류:', err);
        });
}