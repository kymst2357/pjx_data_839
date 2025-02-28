async function loadFileList() {
    const fileListElement = document.getElementById("fileList");
    
    // `text_date` フォルダにあるファイルのリストを取得
    const response = await fetch('https://api.github.com/repos/kymst2357/pjx_data_839/contents/extracted_files/pixiv/text_date');
    const files = await response.json();
    
    files.forEach(file => {
        if (file.name.endsWith('.txt')) { // テキストファイルのみ表示
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `extracted_files/pixiv/text_date/${file.name}`;
            link.textContent = file.name;
            link.target = "_blank"; // 新しいタブで開く
            listItem.appendChild(link);
            fileListElement.appendChild(listItem);
        }
    });
}

// ページ読み込み時に実行
window.onload = loadFileList;
