window.onload = () => {
    let starCount = 800
    let distance = 800
    let parentStars = document.getElementById("stars")
    for(let i = 0; i < starCount; i++){
        let childStar = document.createElement("div")
        childStar.setAttribute("class", "star")
        parentStars.appendChild(childStar)
    }
    for(let i = 0; i < starCount; i++){
        let item = parentStars.children[i]
        // 速度
        let speed = 0.2 + Math.random() * 1
        let thisDistance = distance + Math.random() * 300
        item.style.transformOrigin = "0 0 " + thisDistance + "px";
        item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${Math.random() * 300}deg) rotateX(${Math.random() * -50}deg) scale(${speed}, ${speed})`
    }
}