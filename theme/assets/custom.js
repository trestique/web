const swatchElements = [...document.querySelectorAll('.card-featured-product .swatch-element')]
swatchElements.forEach(element => {
    element.addEventListener('click', function(){
        const dataIndex = this.getAttribute('data-slide-variant-id')
        const selectOptions = this.parentNode.parentNode.parentNode.querySelector('select')
    
        if(!!dataIndex && !!selectOptions){
            selectOptions.selectedIndex = dataIndex
        }
    })
})



  const dataSwatchContainer = [... document.querySelectorAll('.swatches-custom-color-get')]
  const oldDataSwatchContainer = [... document.querySelectorAll('.normal-product-selected-variants-details')]
  const swatchButtons = [... document.querySelectorAll('.swatch-element')]

  oldDataSwatchContainer.map(swatch => {
    swatch.classList.add('force-hidden')
  })
  
  const removeAllClass = () =>  swatchButtons.map(swatch => swatch.classList.remove('active'))
  
  const bodySelector = document.querySelector("body");
  swatchButtons.forEach(swatch => {
    const slideVariant0 = swatch.getAttribute('data-slide-variant-index0')
    const slideVariant = swatch.getAttribute('data-slide-variant-index')
    const parentSwatch = swatch.parentNode.parentNode
    const parentColors = parentSwatch.querySelector('.color-main')
    const parentEle = swatch.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    const parentSelect = parentEle.querySelector('select');
    const mainImage = parentEle.querySelector(".main-image");
      swatch.addEventListener('click', function(){
        removeAllClass()
        swatch.classList.add('active')
        const titleOption = parentSwatch.querySelector('.text-variation-main')
        const descriptionOption = parentSwatch.querySelector('.information-variation-main')
        if(slideVariant0) parentSelect.options[slideVariant0].selected = true;

        const childSelector = parentColors.querySelector(`[data-variant-id="${slideVariant}"]`)
        const valueChild = childSelector.value
        const formatSwatch = valueChild.split(":")

        titleOption.innerHTML = formatSwatch[0]
        descriptionOption.innerHTML = formatSwatch[1]
        let selectedLabel = swatch.querySelector('label');
        let selectedImage = selectedLabel.getAttribute("data-image");
        if(mainImage && ( bodySelector.classList.contains('page-new-skimm-2') || bodySelector.classList.contains('page-new-skimm') )){
            mainImage.setAttribute("src",selectedImage);
        }
        //console.log('addEventListener', formatSwatch, parentSelect, slideVariant)

        
        // dataSwatchContainer.map(dataContainerSwatch => {
        //     dataContainerSwatch.classList.add('force-hidden')
        // })
        // oldDataSwatchContainer.map(swatch => {
        //     swatch.classList.remove('force-hidden')
        // })
      })
  })

  dataSwatchContainer.forEach(swatch => {
    const titleOption = swatch.querySelector('.text-variation-main')
    const descriptionOption = swatch.querySelector('.information-variation-main')
    const parentSwatch = swatch.parentNode
    const swatchColors = parentSwatch.querySelector('[data-variant-id="1"]')
    const valueTextSwatch = swatchColors.value
    const formatSwatch = valueTextSwatch.split(":");

    titleOption.innerHTML = formatSwatch[0]
    descriptionOption.innerHTML = formatSwatch[1]
  })
  

const ajaxCart = (item) => {
    const form = item.parentNode
    const id = form.querySelector('input[name="id"]') ? form.querySelector('input[name="id"]').value : form.querySelector('select').value
    console.log(id)
    const qty = 1

    jQuery.post('/cart/add.js', {
        items: [
        {
            quantity: qty,
            id: id
        }
        ]
    }).done(function(sucess) {
        updateSidecart()
        document.querySelector('[data-ajax-cart-trigger]').click()
    })
    .fail(function(error){
        console.log(error)
    });
}

const allButtonSubmit = [... document.querySelectorAll('.cart-featured-async')]
allButtonSubmit.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        ajaxCart(button)
    })
})
