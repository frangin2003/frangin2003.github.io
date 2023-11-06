const randomColor = () => {
    const range255 = () => random(255, '');
    return `rgb(${range255()},${range255()}, ${range255()}`;
}

const createDiv = (size) => {

    const circle = $('<div/>', {
        'class': `circle blink_${Math.floor(Math.random() * 5) + 1}`,
        'css': {
            'height': `${Math.floor(Math.random() * size) + 1}px`,
            'width': `${Math.floor(Math.random() * size) + 1}px`,
            'left': `${Math.floor(Math.random() * window.innerWidth - 16) + 1}px`,
            'top': `${Math.floor(Math.random() * window.innerHeight - 16) + 1}px`,
            'background-color': randomColor()
        }
    });

    $('.sky').append(circle);
}


const paintStars = (stars, size) => {
    $('.sky').empty();
    for (let i = 0; i < stars; i++) {
        createDiv(size);
    }
}


const random = (range, unit) => {
    return `${Math.floor(Math.random() * range) + 1}${unit}`;
}