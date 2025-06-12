import { useEffect } from "react";

export function DetailMap({lat, lng}: { lat: number; lng: number; }) {
  useEffect(() => {
    var container = document.getElementById('map');
    let options = { center: new window.kakao.maps.LatLng(lat, lng), level: 4, }
    const map = new window.kakao.maps.Map(container, options)
    var coords = new window.kakao.maps.LatLng(lat, lng);
    var marker = new window.kakao.maps.Marker({ map: map, position: coords });
    window.kakao.maps.event.addListener(marker, 'click', function () {
      window.open(`https://map.kakao.com/link/map/${String(lat)},${String(lng)}`);
    });
  }, [])

  return (
    <div className='w-full h-[246px]' id='map'>
      <div className=''></div>
    </div>
  )
}