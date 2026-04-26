document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

// Add your Intersection Observer for the "reveal" animations here
