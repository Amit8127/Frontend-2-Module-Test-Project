function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Somthing is wrong");
    }
}

function showPosition(position) {
    document.cookie = `latitude=${position.coords.latitude}; path=/showData.html`;
    document.cookie = `longitude=${position.coords.longitude}; path=/showData.html`;
    window.location.href = "http://127.0.0.1:5500/showData.html";
}