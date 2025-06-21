// Carregamento do arquivo data.json
let extensions = [];

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    extensions = data;
    renderExtensions(data);
  })
  .catch(error => {
    console.error('Erro ao carregar o data.json:', error);
  });

// Renderizar as extensões na página
function renderExtensions(extensions) {
  const extensionListContainer = document.querySelector('.extensions-list');
  extensions.forEach(extension => {

    // criando o HTML para cada extensão
    const extensionItem = document.createElement('div');
    extensionItem.classList.add('extension-item');

    const itemContent = document.createElement('div');
    itemContent.classList.add('extension-item-content');

    const logo = document.createElement('img');
    logo.src = extension.logo;
    logo.alt = `Logo ${extension.name}`;
    logo.classList.add('extension-logo');

    const info = document.createElement('div');
    info.classList.add('extension-info');

    const name = document.createElement('h3');
    name.classList.add('extension-name');
    name.textContent = extension.name;

    const description = document.createElement('p');
    description.classList.add('extension-description');
    description.textContent = extension.description;

    info.appendChild(name);
    info.appendChild(description);

    itemContent.appendChild(logo);
    itemContent.appendChild(info);

    const controls = document.createElement('div');
    controls.classList.add('extension-controls');

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';

    // Adicionando o event listener para o evento 'click' no botão de remover
    removeButton.addEventListener('click', function () {
      const extensionName = extension.name;

      // 1. Encontrar o índice da extensão no array de dados
      const extensionIndexToRemove = extensions.findIndex(ext => ext.name === extensionName);

      if (extensionIndexToRemove !== -1) {
        // 2. Remover a extensão do array de dados
        extensions.splice(extensionIndexToRemove, 1);

        // 3. Remover o elemento HTML da extensão da página
        const extensionItemToRemove = this.closest('.extension-item'); // 'this' e o botao, closet('.extension-item') encontra o item pai
        if (extensionItemToRemove) {
          extensionListContainer.removeChild(extensionItemToRemove);
        }
      }
    });

    // Criando o toggle switch para ativar/desativar a extensão
    const toggleSwitch = document.createElement('div');
    toggleSwitch.classList.add('toggle-switch');

    // Criando o input do tipo checkbox para o toggle
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.id = `${extension.name.toLowerCase().replace(/\s/g, '-')}-toggle`; // Criar um ID unico
    toggleInput.classList.add('toggle-input');
    toggleInput.checked = extension.isActive;

    // Adicionando o event listener para o evento 'change'
    toggleInput.addEventListener('change', function () {
      const extensionName = extension.name;
      const isChecked = this.checked; // 'this se refere ao checkbox que foi alterado

      // O objetivo aqui é simular um senário real de atualização dos dados.
      const extensionIndex = extensions.findIndex(ext => ext.name === extensionName);
      if (extensionIndex !== -1) {
        extensions[extensionIndex].isActive = isChecked;
      }
    })

    // Criando o label para o toggle
    const toggleLabel = document.createElement('label');
    toggleLabel.classList.add('toggle-label');
    toggleLabel.setAttribute('for', toggleInput.id);

    toggleSwitch.appendChild(toggleInput);
    toggleSwitch.appendChild(toggleLabel);

    controls.appendChild(removeButton);
    controls.appendChild(toggleSwitch);

    extensionItem.appendChild(itemContent);
    extensionItem.appendChild(controls);

    extensionListContainer.appendChild(extensionItem);
  });
}

// Adicionando funcionalidade de filtro
const filterButtons = document.querySelectorAll('.filter-button');
let currentFilter = 'All';

filterButtons.forEach(button => {
  button.addEventListener('click', handleFilterClick);
});

function handleFilterClick(event) {
  const clickedFilter = event.target.textContent;

  // Verificar se o filtro clicado é o mesmo que o atual
  let filteredExtensions = [];

  if (clickedFilter === 'All') {
    filteredExtensions = extensions;
  } else if (clickedFilter === 'Active') {
    filteredExtensions = extensions.filter(extension => extension.isActive);
  } else if (clickedFilter === 'Inactive') {
    filteredExtensions = extensions.filter(extension => !extension.isActive);
  }

  // Limpar a lista de extensões atual na tela
  const extensionsListContainer = document.querySelector('.extensions-list');
  extensionsListContainer.innerHTML = '';

  // Renderizar a nova lista filtrada
  renderExtensions(filteredExtensions);

  // Atulizar o estado visual dos botões de filtro
  updateFilterButtonStyles(clickedFilter);
}

//  Atualizar os estilos dos botões de filtro
function updateFilterButtonStyles(activeFilter) {
  filterButtons.forEach(button => {
    if (button.textContent === activeFilter) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  currentFilter = activeFilter;
}

//selecao de tema de cores
const lightThemeButton = document.querySelector('.light-theme');
const darkThemeButton = document.querySelector('.dark-theme');
const body = document.body;

lightThemeButton.addEventListener('click', switchToLightTheme);
darkThemeButton.addEventListener('click', switchToDarkTheme);

// Funções para alternar entre os temas
function switchToLightTheme() {
  body.classList.remove('dark');
  body.classList.add('light');
  darkThemeButton.style.display = 'block'; 
  lightThemeButton.style.display = 'none'; 
  localStorage.setItem('theme', 'light'); // Salva a preferência no localStorage
}

function switchToDarkTheme() {
  body.classList.remove('light');
  body.classList.add('dark');
  lightThemeButton.style.display = 'block'; 
  darkThemeButton.style.display = 'none'; 
  localStorage.setItem('theme', 'dark');
}

// Verificar a preferência de tema ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  switchToDarkTheme();
} else if (savedTheme === 'light') {
  switchToLightTheme();
} else {
  switchToLightTheme();
}