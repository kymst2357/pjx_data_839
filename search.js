let allData = [];
let selectedTags = [];

// 初回読み込み時に JSON データを取得
async function loadData() {
    const response = await fetch('extracted_files/pixiv/all_date.json');
    allData = await response.json();
    generateTagList();
}

// タグのリストを生成（多い順）
function generateTagList() {
    const tagCounts = {};
    allData.forEach(item => {
        item.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(tag => tag[0]);

    const tagContainer = document.getElementById('tagContainer');
    tagContainer.innerHTML = '';

    sortedTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.innerText = tag;
        tagButton.onclick = () => toggleTagSelection(tag, tagButton);
        tagContainer.appendChild(tagButton);
    });
}

// タグ選択のON/OFF
function toggleTagSelection(tag, button) {
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
        button.style.backgroundColor = '';  // 選択解除
    } else {
        selectedTags.push(tag);
        button.style.backgroundColor = 'lightblue';  // 選択中の表示
    }
}

// 検索処理
function search() {
    const titleQuery = document.getElementById('titleSearch').value.toLowerCase();
    const keywordQuery = document.getElementById('keywordSearch').value.toLowerCase();

    const results = allData.filter(item =>
        (titleQuery && item.title.toLowerCase().includes(titleQuery)) || 
        (keywordQuery && (item.title.toLowerCase().includes(keywordQuery) || item.tags.some(tag => tag.toLowerCase().includes(keywordQuery)))) ||
        (selectedTags.length > 0 && selectedTags.some(tag => item.tags.includes(tag)))
    );

    displayResults(results);
}

// 検索結果の表示
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>該当する作品が見つかりませんでした。</p>';
        return;
    }

    results.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2><a href="extracted_files/pixiv/text_date/${item.id.toString().padStart(5, '0')}.txt" target="_blank">${item.title}</a></h2>
            <p>作者: ${item.author}</p>
            <p>タグ: ${item.tags.join(', ')}</p>
        `;
        resultsDiv.appendChild(div);
    });
}

// ページ読み込み時にデータを取得
window.onload = loadData;
