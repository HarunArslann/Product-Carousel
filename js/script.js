
$(document).ready(function () {
  
  $.getJSON("product-list.json", function(result){
    showProducts(result, "Size Özel");
  });

  lazyLoad();
  
});

function showProducts(result, categoryName) {
    
  const products = result["responses"][0][0]["params"]["recommendedProducts"][categoryName]
  $.each(products, function (index, product) {
    $('.product-container').append(`<div class="product-card">
<div class="product-image">

  <img src = "${product['image']}">

</div>
<div class="product-info">
  <div class="product-short-description-box">
      <p class="product-short-description">${product["name"]}</p>
  </div>

  <span class="price">${product["priceText"]}</span>
  <div class="product-shipping"><i class="fa-solid fa-truck"></i>
      <p>Ücretsiz Kargo</p>
  </div>
  ${shippingFee(product["params"]["shippingFee"])}
</div>
<div class="button-a">

  <button>Sepete Ekle</button>
</div>
</div>`);

  })
}


function shippingFee(shipping) {

  if (shipping === "FREE" ){
      $(".product-shipping").css('visibility' , 'visible')
  }

  return "";

}



function lazyLoad() {
  let options = {
      root : null,
      rootMargin : '0px',
      threshold : 0.25
  };

  let callback = (entries, observer) => {
      entries.forEach(entry => {
          if(entry.isIntersecting
              && entry.target.className === 'image' ){
                  let imageUrl = entry.target.getAttribute('data-img');
                  if(imageUrl){
                      entry.target.src = imageUrl;
                      observer.unobserve(entry.target);
                  }
              }
          
      })
  }
  let observer = new IntersectionObserver(callback, options);
  let images = document.getElementsByClassName('image')
  
  for(let i = 0 ; i < images.length ; i++){
      observer.observe(images.item(i))    
  }
  
}

const categoryMap = {
  "Size Özel" : "Size Özel",
  "Tamir, Tadilat Gereçleri" : "Yapı Market & Tamirat > Tamir, Tadilat Gereçleri",
  "Mobilya" : "Ev, Dekorasyon, Bahçe > Mobilya",
  "Sağlık, Medikal" : "Kozmetik & Kişisel Bakım > Sağlık, Medikal",
  "Dizüstü Bilgisayar (Laptop)" : "Bilgisayar, Tablet > Dizüstü Bilgisayar (Laptop)",
  "Isıtma, Soğutma Sistemi" : "Beyaz Eşya & Küçük Ev Aletleri > Isıtma, Soğutma Sistemi"
}


const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn img')];
const preBtn = [...document.querySelectorAll('.pre-btn img')];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += 550;
  })

  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= 550;
  })
})

$(document).ready(function () {
  
  let timer = null;

  $('.product-container').on('click', '.button-a', function () {

    if (timer) {
    
      clearTimeout (timer);
      timer = null;
  
    }

    if($('.alert').hasClass("show")){

      $('.alert').removeClass("showAlert")
      $('.alert').removeClass("show")

     setTimeout(function () {
        $('.alert').addClass("show")
        $('.alert').addClass("showAlert")
      }, 100);
      
    }else{

      $('.alert').addClass("show")
      $('.alert').removeClass("hide")
      $('.alert').addClass("showAlert")
    }

    timer = setTimeout(function () {
      waitFunction();
      clearTimeout (timer);
      timer = null;
    },2000);

    function waitFunction () {

      $('.alert').removeClass("show");
      $('.alert').addClass("hide");
      
  }
    
  });

  $('.close-btn').click(function () {
    $('.alert').removeClass("show");
    $('.alert').addClass("hide");
  });

  

});

$('li button').click(function () {

  $(".product-container").empty()

  $('li button').each(function () {
    $(this).removeClass('selectedclass')
    $(this).closest("li").removeClass('selectedclass')
  });

  $(this).addClass('selectedclass');
  $(this).closest("li").addClass('selectedclass');


  let categoryName = $(this).text();

  $.getJSON("product-list.json", function(result){
    showProducts(result, categoryMap[categoryName]);
  });
});




