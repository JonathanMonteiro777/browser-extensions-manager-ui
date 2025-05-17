fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    renderExtensions(data);
  })
  .catch(error => {
    console.error('Erro ao carregar o data.json:', error);
  });

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
    removeButton.addEventListener('click', function() {
      const extensionName = extension.name;

      console.log(`Botão "Remove" clicado para a extensão: ${extensionName}`);

      // 1. Encontrar o índice da extensão no array de dados
      const extensionIndexToRemove = extensions.findIndex(ext => ext.name === extensionName);

      if (extensionIndexToRemove !== -1) {
        // 2. Remover a extensão do array de dados
        extensions.splice(extensionIndexToRemove, 1);
        console.log('Extensao removida dos dados:', extensions);

        // 3. Remover o elemento HTML da extensão da página
        const extensionItemToRemove = this.closest('.extension-item'); // 'this' e o botao, closet('.extension-item') encontra o item pai
        if (extensionItemToRemove) {
          extensionListContainer.removeChild(extensionItemToRemove);
        }

        // (Opcional) Se um filtro estiver aplicado, você pode querer renderizar a lista novamente
        // para refletir a remoção. Vamos deixar isso para quando implementarmos a filtragem.
      }
    });
    const toggleSwitch = document.createElement('div');
    toggleSwitch.classList.add('toggle-switch');

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.id = `${extension.name.toLowerCase().replace(/\s/g, '-')}-toggle`; // Criar um ID unico
    toggleInput.classList.add('toggle-input');
    toggleInput.checked = extension.isActive;

    // Adicionando o event listener para o evento 'change'
    toggleInput.addEventListener('change', function() {
        const extensionName = extension.name;
        const isChecked = this.checked; // 'this se refere ao checkbox que foi alterado

        console.log(`Estado de "${extensionName}" mudou para: ${isChecked}`);

        // O objetivo aqui é simular um senário real de atualização dos dados.
        const extensionIndex = extensions.findIndex(ext => ext.name === extensionName);
        if (extensionIndex !== -1) {
            extensions[extensionIndex].isActive = isChecked;
            console.log('Dados da extensão atualizados:', extensions[extensionIndex]);
        }
    })

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