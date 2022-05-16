const instance = axios.create({
    baseURL: 'http://localhost:8089/',
    headers: {
      'Content-Type': 'application/json'
    }
})

$(document).ready(function() {
    const productWrapper = $( "#12w21" )

    let products = []

    getAllProducts().then( res => {
        for ( let product of res )
        {
            getProductPhoto(product.id_product).then( res => {
                const newProduct = product
                product.url = res.data
                products.push(newProduct)
            })
        }
    })

    function renderProducts(products) {
        for (let product of products) {
            productWrapper.append( `
            <div class="item" id="item_${product.id_product}">
                <div class="f_p_item">
                    <div class="f_p_img">
                        <img class="img-fluid" src="${product.url}" alt="">
                        <div class="p_icon">
                            <a href="#"	><i class="lnr lnr-heart"></i></a>
                            <a href="#"><i class="lnr lnr-cart"></i></a>
                        </div>
                    </div>
                    <a href="#"><h4>${product.name}/h4></a>
                    <h5>₽${product.price}/сутки</h5>
                </div>
            </div>` );
            $(`#item_${product.id_product}`).click(function() {
                
            })
        }
    }
})
  
function getAllProducts() {
    return instance.get(`api/v1/products`)
      .then(res => {return res.data})
}