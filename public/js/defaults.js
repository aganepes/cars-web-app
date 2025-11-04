document.addEventListener('DOMContentLoaded', async function () {
    const theme = localStorage.getItem('tmcars-theme');
    if (theme == 'ligth') {
        ForLigthTheme();
    } else {
        ForDarkTheme();
    }
})
// document click
document.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll("header .header-list").forEach(el => {
        el.classList.remove('active');
    });
    userProfileContent.classList.remove('profile-view');
    MainHeader.classList.remove('mobil-menu-view');
})

// Location list view
const headerLocation = document.getElementById('header-location')
const headerLocationContent=document.querySelector('header .locations .content-location')
headerLocation.addEventListener('click', (e) => {
    e.stopPropagation();
    headerLocationContent.classList.toggle('active');
    // others
    document.querySelectorAll("header .header-list").forEach((el,i) => {
        if(!headerLocation.classList.contains('active') && i!=0){
            el.classList.remove('active');
        }
    })
    userProfileContent.classList.remove('profile-view');
    MainHeader.classList.remove('mobil-menu-view');
})
// Language list view
const headerLanguage = document.getElementById('header-language');
const headerLanguageContent = document.querySelector('header .languages .content-language');
headerLanguage.addEventListener('click', (e) => {
    e.stopPropagation();
    headerLanguageContent.classList.toggle('active');
    // others
    document.querySelectorAll("header .header-list").forEach((el,i) => {
        if(!headerLanguage.classList.contains('active') && i!=1){
            el.classList.remove('active');
        }
    })
    userProfileContent.classList.remove('profile-view');
    MainHeader.classList.remove('mobil-menu-view');
})
// dark mode list view
const themeButton = document.getElementById('button-theme');
const themeContent = document.querySelector('header .dark-theme .theme-list');

themeButton.addEventListener('click', (e)=> {
    e.stopPropagation();
    themeContent.classList.toggle('active');
    // others
    document.querySelectorAll("header .header-list").forEach((el,i) => {
        if(!themeButton.classList.contains('active') && i!=2){
            el.classList.remove('active');
        }
    })
    userProfileContent.classList.remove('profile-view');
    MainHeader.classList.remove('mobil-menu-view');
})



//  dark icon to change of dark button
document.querySelector('header .dark-theme .theme-list.header-list .dark').addEventListener('click',(e)=>{
    ForDarkTheme();
})
function ForDarkTheme() {
    const darkButtons = document.querySelectorAll('#button-theme span');
    for (const button of darkButtons) {
        button.classList.remove('display-none');
        if(button.classList.toString().includes('ligth')){
            button.classList.add('display-none');
        }
    }
    const items = document.querySelectorAll('header .dark-theme .theme-list.header-list li')
    for (const item of items) {
        item.classList.remove('header-list-active');
        if(item.classList.toString().includes('dark')){
            item.classList.add('header-list-active');
        }
    }
    // add dark class in body
    document.getElementsByTagName('body')[0].classList.add('dark');
    localStorage.setItem('tmcars-theme', 'dark');
}
// ligth icon to change of dark button
document.querySelector('header .dark-theme .theme-list.header-list .ligth').addEventListener('click',(e)=>{
    ForLigthTheme();
})
function ForLigthTheme() {
    const darkButtons = document.querySelectorAll('#button-theme span');
    for (const button of darkButtons) {
        button.classList.remove('display-none')
        if(button.classList.toString().includes('dark')){
            button.classList.add('display-none');
        }
    }
    const items = document.querySelectorAll('header .dark-theme .theme-list.header-list li')
    for (const item of items) {
        item.classList.remove('header-list-active');
        if(item.classList.toString().includes('ligth')){
            item.classList.add('header-list-active');
        }
    }
    // remove dark class in body
    document.getElementsByTagName('body')[0].classList.remove('dark');
    localStorage.setItem('tmcars-theme', 'ligth');
}
// User Profile view
const userProfile = document.querySelector('#user-profile .user-img');
const userProfileContent = document.querySelector('#user-profile .user-data');
if(userProfile){
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        userProfileContent.classList.toggle('profile-view');
        // others
        document.querySelectorAll("header .header-list").forEach(el => {
            el.classList.remove('active');
        });
        MainHeader.classList.remove('mobil-menu-view');
        // filer menus not show 
        document.querySelectorAll('.dropdown-menu').forEach((el) => {
            el?.classList.remove('show-flex');
        });
    });
}
// Mobil menu 
const MobilMenu = document.querySelector('.menu-botton');
const MainHeader = document.querySelector('header .main-header');
if (MobilMenu) {
    MobilMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        MainHeader.classList.toggle('mobil-menu-view');
        // others
        document.querySelectorAll("header .header-list").forEach(el => {
            el.classList.remove('active');
        });
        userProfileContent.classList.remove('profile-view');
    });
}


// scroll button
const TopScrollButton = document.getElementById('scroll-bottom');
const OnlineChatButton = document.getElementById('msg-btn');
if (TopScrollButton) {
    TopScrollButton.addEventListener('click',()=>{
        let lastScrollY = window.scrollY;
        const partScroll = scrollY / 10;
        if (lastScrollY > 500) {
            const scrollInterID = setInterval(() => {
                lastScrollY -= partScroll;
                window.scrollTo(0, lastScrollY);
                if (lastScrollY <= 0) clearInterval(scrollInterID);
            }, 50)
        } else window.scrollTo(0, 0);
    })
}

const ChatContDisplay=(e)=>{
    const chatCont = document.querySelector('.additions-cont .chat-cont');
    const chatDisplay = window.getComputedStyle(chatCont).display;
    if (e.currentTarget.outerWidth) {
        if (e.currentTarget.outerWidth < 640) chatCont.style.display = 'none';
    } else if (chatDisplay == 'flex') {
        chatCont.style.display = 'none';
    } else {
        chatCont.style.display = 'flex';
    }
    OnlineChatButton.classList.toggle('active');
}
if (OnlineChatButton) {
    OnlineChatButton.addEventListener('click', ChatContDisplay);
    window.addEventListener('resize', function (e) {
        ChatContDisplay(e);
        if (e.currentTarget.outerWidth > 795)
            MainHeader.classList.remove('mobil-menu-view');
    });
    document.getElementById('online-chat-button').addEventListener('click', function (e) { AddChatToOnline(e, 'click') });
    document.getElementById('online-chat-input').addEventListener("keydown", function (e) { AddChatToOnline(e, 'keydown') });
}

//  Online Assistand
function AddChatToOnline(e,which){
    const inputEl = document.getElementById('online-chat-input');
    const chatCont = document.getElementById('online-chat-cont');

    if(inputEl.value &&((e.code=='Enter'&& which=='keydown')||which=='click')){
        chatCont.innerHTML += `<span class="question">${inputEl.value}</span>`;
        document.querySelector('.chat-cont .writed-chats').scrollTo(0, 1000);
    // send Api inputEl.value
        inputEl.value = '';
    }
}
// Search results
const headerSearchElement = document.getElementById('header-search');
const searchResultElement = document.querySelector('.input-container .search-result-container');
headerSearchElement.addEventListener('keyup', async(e) => {
    searchResultElement.innerHTML = '';
    searchValue = e.target.value;
    if (searchValue.length > 1) {
        // send to api
        /*
        const responst = await fetch(`localhost:3000/api/search?title=${e.value}`, {
            method: 'GET',
        });
        const data = await responst.json();
        */
        // local working
        const data = searchData.filter((v) => v.title.includes(e.target.value));
        let minTitle = '';
        if(data.length){
            searchResultElement.classList.remove('display-none');
        }
        if (minTitle) {
            e.target.setAttribute('placeholder', minTitle);
        }
        for (const item of data) {
            searchResultElement.innerHTML+=createSearchElement({ ...item });
        }
    } else {
        searchResultElement.classList.add('display-none');
    }
});
headerSearchElement.addEventListener('focusout', (e) => {
    console.log('focus out')
    searchResultElement?.classList.add('display-none');
});
headerSearchElement.addEventListener('focus', (e) => {
    console.log('focus')
    if (searchResultElement?.children.length) {
        searchResultElement.classList.remove('display-none');
    }
});
if (searchResultElement?.clientHeight > 390) {
    console.log('scroll');
    searchResultElement.style.overflowY = "scroll";
}
/**
 * @param {String} title 
 * @param {String} link 
 * @returns {HTMLLinkElement}
 */ 
const createSearchElement = ({title,url,category}) => {   
    // const element = document.createElement('a');
    // element.setAttribute('class', 'result');
    // element.setAttribute('class', 'result');
    // element.setAttribute('href', url+`?mask=${title}`);

    // const pElement = document.createElement('p');
    // pElement.setAttribute('class', 'title');
    // pElement.textContent = title;

    // const spanElement = document.createElement('span');
    // spanElement.setAttribute('class','category-name');
    // spanElement.textContent = category;

    // element.appendChild(pElement);
    // element.appendChild(spanElement);
    // return element;

    return `<a href="${url}?mask=${title}" class="result">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <path
                        d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
                </svg>
                <div class='content'>
                    <p class="title">${title}</p>
                    <span class="category-name">${category}</span>
                </div>
            </a>`;
}
//  Data for search 
const searchData = [
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },

    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },

    {
        title: 'car',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'bal',
        category: 'others',
        url:'host/others',
    },
    {
        title: 'corekler',
        category: 'others',
        url:'host/others',
    },
    {
        title: 'kran',
        category: 'santehnika',
        url:'host/cars',
    },
    {
        title: 'toyota',
        category: 'cars',
        url:'host/cars',
    },
    {
        title: 'kwartira',
        category: 'others',
        url:'host/others',
    },
    {
        title: 'jay',
        category: 'others',
        url:'host/others',
    }
]
