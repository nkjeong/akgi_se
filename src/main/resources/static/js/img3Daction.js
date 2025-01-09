"use strict";
const set3DactionImg = async (ele, dir, finalDir) => {
    const getEle = document.querySelector(`${ele}`);
    const directoryPath = dir;
    let html = '';
    try {
        const response = await fetch(`/api/files/list?directoryPath=${encodeURIComponent(directoryPath)}`);
        const data = await response.json();
        data.forEach((d, i)=>{
			html += `
				<span style="--i:${i+1};"><img src="/images/banner/${finalDir}/${d}"></span>
			`;
		});
		if(getEle){
			getEle.innerHTML = html;
		}
    } catch (error) {
        console.error('Error fetching the file list:', error);
    }
}

//set3DactionImg('.box_1', 'D:/git/akgi/web/src/main/resources/static/images/banner/banner_3d_1', 'banner_3d_1');
//set3DactionImg('.box_2', 'D:/git/akgi/web/src/main/resources/static/images/banner/banner_3d_2', 'banner_3d_2');
//set3DactionImg('.box_1', 'E:/gitakgi/akgi/web/src/main/resources/static/images/banner/banner_3d_1', 'banner_3d_1');
//set3DactionImg('.box_2', 'E:/gitakgi/akgi/web/src/main/resources/static/images/banner/banner_3d_2', 'banner_3d_2');
//set3DactionImg('.box_1', 'H:/0_akgi/github/akgi/web/src/main/resources/static/images/banner/banner_3d_1', 'banner_3d_1');
//set3DactionImg('.box_2', 'H:/0_akgi/github/akgi/web/src/main/resources/static/images/banner/banner_3d_2', 'banner_3d_2');


set3DactionImg('.box_1', '/web/akgiwebapp/src/main/resources/static/images/banner/banner_3d_1', 'banner_3d_1');
set3DactionImg('.box_2', '/web/akgiwebapp/src/main/resources/static/images/banner/banner_3d_2', 'banner_3d_2');