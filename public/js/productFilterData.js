document.addEventListener('DOMContentLoaded', () => {
    // create element saved url from localStronge 
    CreateSaveUrlElements();
})

// drow-menu not show when filter button and other elementler been click. 
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-menu')) {  
        document.querySelectorAll('.dropdown-menu').forEach((el) => {
            el.classList.remove('show-flex');
        });
        //  input element value to empty that when not focus
        document.querySelectorAll('.bs-searchbox input').forEach(input => {
                input.value = "";
                filterList(input);
        });
    }
    if (!e.target.closest('header .header-list')) {   
        document.querySelectorAll("header .header-list").forEach(el => {
            el.classList.remove('active');
        });
    }
})
// not show all container of drow-menu.
function AllNotShowDropdownMenu(index) {
    document.querySelectorAll('.dropdown-menu').forEach((el,i) => {
        if (i!=index) el.classList.remove('show-flex');
    });
}
// show container drow-menu 
document.querySelectorAll('.dropdown-toggle').forEach((element,i) => {
    element.addEventListener('click', event => {
        event.stopPropagation()
        const id = element.dataset.id + '-list';
        const selectElement = document.getElementById(id);

        selectElement.classList.toggle('show-flex');    
        
        document.querySelectorAll("header .header-list").forEach(el => {
            el.classList.remove('active');
        });
        document.querySelector('.user-data.items').classList.remove('profile-view');
        AllNotShowDropdownMenu(i);
    });
})

//  create model elements when selected brand.
function createModelElementsOf(index, id) {
    // select to change other id to select
    let otherId = '';
    if (id == 'brandSelect') otherId = 'modelSelect'; 
    if(id == 'modelSelect') otherId = 'trimSelect';
    if (id == 'othersSelect') otherId = "othersCategorySelect";

    const ModelSelectElement = document.getElementById(`${otherId}`);
    const ModelListElement = document.querySelector(`#${otherId}-list .bselectpicker`);
    ModelSelectElement.innerHTML = '';
    ModelListElement.innerHTML = '';

    //  to fetch  when selected brand.
    const brands = ['', 'Toyota', 'Lexus', 'BMW', 'Mercedes-Benz'];
    const models = {
        '1': ['Toyota-model-1', 'Toyota-model-2', 'Toyota-model-3', 'Toyota-model-4', 'Toyota-model-5'],
        '2': ['Lexus-model-1', 'Lexus-model-2', 'Lexus-model-3', 'Lexus-model-4', 'Lexus-model-5'],
        '3': ['BMW-model-1', 'BMW-model-2', 'BMW-model-3', 'BMW-model-4', 'BMW-model-5'],
        '4': ['Mer-Benz-model-1', 'Mer-Benz-model-2', 'Mer-Benz-model-3', 'Mer-Benz-model-4', 'Mer-Benz-model-5']
    }
    
    if (index != 0) {
        for (let i = 0; i < models[index].length; i++) {
            // create option elements: value= degeri api den gelmeli.
            ModelSelectElement.innerHTML += `
                <option value="${i + 1}" data-slug="${models[index][i].toLowerCase()}"></option>
            `;
            // create list elements
            ModelListElement.innerHTML += `
                <li onclick="selectOptionValue(this)" data-id='${otherId}' data-index='${i + 1}' data-title=${otherId=="modelSelect" ? 'Model saýlaň' :"Bölümçe saýlaň" }>
                    <span>${models[index][i]}</span>
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                    </span>
                </li>
            `;
        }
    }

}

// items filter to list of drow-menu.
function filterList(element){
    const id = element.dataset.id + '-list';
    const inputValue = element.value.toLowerCase();
    const firstElement = document.querySelector(`#${id} .bselectpicker li:nth-child(1)`);
    if(!inputValue){
        if (firstElement?.classList.contains('not-show'));
            firstElement?.classList.remove('not-show');
    }else{
        firstElement?.classList.add('not-show');
    }

    document.querySelectorAll(`#${id} .bselectpicker li`).forEach((el,i)=>{
        if (i != 0 || element.dataset.id!=='brandSelect'){
            if(!el.textContent.toLowerCase().includes(inputValue)&&inputValue){
                if (!el.classList.contains('not-show'))
                    el.classList.add('not-show');
            }else{
                if (el.classList.contains('not-show'))
                    el.classList.remove('not-show');
            }
        }
    })

}

// option selected when selected element from drow-menu.
function selectOptionValue(element) {
    const idName = element.dataset.id;
    const index = Number(element.dataset.index);
    const SelectElement = document.getElementById(idName);
    // two time selects to input
    if (idName != 'brandSelect' && idName!='othersSelect' && idName != 'sortselectpicker'){
        // add show-flex to icon
        element.children[1].classList.toggle('show-flex');
        // change textContent toggle button 
        const selectedBrand = [];
        document.querySelectorAll(`#${idName}-list .bselectpicker li`).forEach(li => {
            if (li.children[1].classList.contains('show-flex')) {
                selectedBrand.push(li.children[0].textContent);
            }
        })
        
        SelectElement.options[index - 1].selected = !SelectElement.options[index - 1].selected;

        if (selectedBrand.length)
            document.querySelector(`#${idName}-button .title p`).textContent = selectedBrand.join(',');
        else
            document.querySelector(`#${idName}-button .title p`).textContent = element.dataset.title;
        
    } else {
        // one time selects to input
        
        // add show-flex to icon
        document.querySelectorAll(`#${idName}-list .bselectpicker li`).forEach((li,i)=>{
                li.classList.remove('active-brand');
        })
        element.classList.add('active-brand');
        // change textContent to the toggle button
        if (index != 1) {
            document.querySelector(`#${idName}-button .title p`).textContent = element.textContent;
            document.getElementById(idName + '-list').classList.remove('show-flex');
        } else
            document.querySelector(`#${idName}-button .title p`).textContent = element.dataset.title;
        // select value of option element 
        SelectElement.selectedIndex = index - 1;
        
        // function  change to product   
        createModelElementsOf(index - 1,idName);
        //  select-list none display
        document.getElementById(idName + '-list').classList.remove('show-flex');
        // clear value to search input 
        if (idName == 'brandSelect' || idName=='othersSelect'){
        const inputElement = document.getElementById(idName + '-list').querySelector('input');
        inputElement.value = '';
            filterList(inputElement);
        }
    }
    // clicked attribute remove
    const id = element.dataset.id;
    const idList = id + '-list';

    let selectEl = document.getElementById(idList);
    if (id == 'brandSelect' || id=='othersSelect') {
        selectEl.classList.remove('show-flex');
    } 
}

// checkbox active  to filter of input[type="checkbox"]
function activeCheckbox(i) {
    document.querySelector(`#ProductsFilterPanel .filter-product-selects:nth-child(${i + 1})`).classList.toggle('active-checkbox');
}

// submit for filter cars 
const ProductsFilterForm = document.getElementById("product-filter");//submit
ProductsFilterForm.addEventListener('', (e) => {
    e.preventDefault();
    const formData = {};
    var url='?'
    const inputElements = document.querySelectorAll('product-filter .form-control');
    inputElements.forEach((El) => {
        const name = El.getAttribute('name');
        const type = El.getAttribute('type');

        if (type == 'checkbox') {
            formData[name] = El.checked;
            if (El.checked)
                url += `${name}=${El.checked}&`;
        }

        if (type == 'text' || type == 'number') {
            formData[name] = El.value;
            if (El.value) {
                url += `${name}=${El.value}&`;
            }
        }
        
        if (!type) {
            const selectedOptions = Array.from(El.selectedOptions);
            let values;
            if (name == "brandId" || name=="othersId") {
                values= selectedOptions.filter(o => o.getAttribute('data-slug')).map(o => o.getAttribute('data-slug'));
            }else
                values = selectedOptions.filter(o => o.value).map(o => o.value);
            
            formData[name] = values;
            if ((values.length && name != 'brandId')||(values.length && name != 'othersId'))
                url += `${name}=${values.toString().replace(',','%2C')}&`;
        }
    });
    
    const SearchURL = url.substring(0, url.length - 1);
    let urlLocal = location.pathname;
    
    if (formData['brandId']?.length || formData['othersId']?.length) {
        let paths = urlLocal.split('/');
        paths.pop();
        
        if (formData['brandId']) paths.push(formData['brandId'][0]);
        if (formData['othersId']) paths.push(formData['othersId'][0]);
        
        urlLocal = paths.join('/');
    }
    const El = document.createElement('a');
    El.href = urlLocal + SearchURL;
    El.click();
    El.remove();
})

// show to url when has saved filter data. 
function CurrentUrlSave(name) {
    let storageFilterUrls = localStorage.getItem('tmcars-filter-url');

    if (storageFilterUrls){
        storageFilterUrls += `${name}::${location.toString()};`;
        localStorage.setItem('tmcars-filter-url', storageFilterUrls);
    } else {
        localStorage.setItem(`tmcars-filter-url`, `${name}::${location.toString()};`);
    }
}

// save to filter url.
function CreateSaveUrlElements() {
    const SavedFilterContainer = document.getElementById('SavedFilter');  
    SavedFilterContainer.innerHTML = "";
    const storageFilterUrls = localStorage.getItem('tmcars-filter-url')?.split(';').filter(v=>v).map((item, i) => {
        const name = item.split('::')[0];
        const url = item.split('::')[1];
        return { name, url };
    });
    if (storageFilterUrls && storageFilterUrls.length) {
        for (let item of storageFilterUrls) {
            SavedFilterContainer.innerHTML += `
                <div class="item">
                    <a href="${item.url}" class="name">${item.name}</a>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name='${item.name}'  height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </div>`
        }
        SavedFilterContainer.style.display = 'block';

        SavedFilterContainer?.querySelectorAll('svg').forEach(el => {
            el.addEventListener('click', () => RemoveSavedUrl(el.dataset.name));
        });
    } else {
        SavedFilterContainer.style.display = 'none';
    }
}

function RemoveSavedUrl(name) {
    const storageFilterUrls = localStorage.getItem('tmcars-filter-url');
    let newUrls = storageFilterUrls.split(';').filter((v) => !v.includes(name)).join(';');
    if (newUrls == ';') {
        newUrls = ''; 
    }
    localStorage.setItem('tmcars-filter-url', newUrls);
    CreateSaveUrlElements();
}

document.getElementById('saveUrl').addEventListener('click', (e) => {
    document.getElementById('getNameForSaveUrl').style.display = "flex";
});

document.getElementById('close-save-url-container').addEventListener('click', () => {
    closeInput()
});
function closeInput() {
    document.getElementById('getNameForSaveUrl').style.display = "none";
    document.getElementById('InputSaveUrlOfName').value = "";
    document.querySelector('#getNameForSaveUrl .error-name').textContent = "";
}

document.getElementById('save-url-btn').addEventListener('click', () => {
    SaveInput();
});
function SaveInput() {
    const isHasName = "Bu atly eýýam bar.";
    const isHasUrl = "Bu salgy eýýam bar.";
    const isNot="Hökman at bolmaly."
    let name = document.getElementById('InputSaveUrlOfName').value;
    const ErrorElement = document.querySelector('#getNameForSaveUrl .error-name');
    if (!name) {
        ErrorElement.textContent = isNot;
    } else {
        const SavedData = localStorage.getItem('tmcars-filter-url');
        if (SavedData){
            if (SavedData.includes(name+':')) {
                ErrorElement.textContent = isHasName;
                return;
            }
            if (SavedData.includes(location.toString() + ';')) {
                ErrorElement.textContent = isHasUrl;
                return;
            }
        }
        CurrentUrlSave(name);
        document.getElementById('InputSaveUrlOfName').value = '';
        // close input of save url.
        document.getElementById('getNameForSaveUrl').style.display="none";
        CreateSaveUrlElements();
    }
}

document.querySelectorAll('.bs-searchbox input').forEach(input => {
    
});
// element product and change other product category of element.
document.querySelectorAll('#product-filter .bselectpicker li').forEach(element => {
    element.addEventListener('click', (e) => {
        selectOptionValue(e.target);
    });
});
document.querySelectorAll('.bs-searchbox input').forEach(input => {
//  category list filter that is when  input element keyup to that
    input.addEventListener('keyup', (e) => {
        filterList(e.target);
    });
});




const carsProductLimit = 60;
const carsProductStep = 1;
// create element for ProductTable
function createProductElement(limit) {
    // limit=1
    // get data to api
    
    // limit>1
    // get data to api

}