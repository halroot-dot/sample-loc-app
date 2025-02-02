// URLパラメータから値を取得して入力欄に設定
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const lat = params.get('lat');
  const lng = params.get('lng');

  if (lat) document.getElementById('latitude').value = lat;
  if (lng) document.getElementById('longitude').value = lng;

  registeredLocation = getLocation();
  updateDisplayedLocation();
};

let registeredLocation = {
  lat: null,
  lng: null,
};

// 登録位置をローカルストレージに保存
function saveLocation(lat, lng) {
  const location = { lat, lng };
  localStorage.setItem('registeredLocation', JSON.stringify(location));
  return location;
}

// 登録位置を取得
function getLocation() {
  const saved = localStorage.getItem('registeredLocation');
  return saved ? JSON.parse(saved) : { lat: null, lng: null };
}

// フォーム送信時の処理
document
  .getElementById('locationForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const lat = document.getElementById('latitude').value;
    const lng = document.getElementById('longitude').value;

    // 値を保存
    registeredLocation = saveLocation(lat, lng);

    // 画面に表示
    updateDisplayedLocation();
  });

// 登録位置の表示を更新
function updateDisplayedLocation() {
  const display = document.getElementById('currentLocation');
  if (registeredLocation.lat && registeredLocation.lng) {
    display.innerHTML = `緯度: ${registeredLocation.lat}<br>経度: ${registeredLocation.lng}`;
  } else {
    display.innerHTML = '未登録';
  }
}

// プリセット位置を設定する関数
function setLocation(lat, lng) {
  document.getElementById('latitude').value = lat;
  document.getElementById('longitude').value = lng;
}

// APIエンドポイントとして機能
window.getRegisteredLocation = function () {
  return getLocation();
};
