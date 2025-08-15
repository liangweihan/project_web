//手機板導覽列
function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

//當視窗大小改變時檢查選單
function checkSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.style.display = 'none';
    }
}

//添加事件監聽器
window.addEventListener('resize', checkSidebar);