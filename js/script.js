
$(document).ready(function () {

  $.getJSON("product-list.json", function (result) {
    showProducts(result, "Size Özel");
  });

});

function showProducts(result, categoryName) {

  const products = result.responses[0][0].params.recommendedProducts[categoryName]

  $.each(products, function (index, product) {
    $('.product-container').append(`<div class="product-card" data-id="${product.productId}">
<div class="product-image">

</div>
<div class="product-info">
  <div class="product-short-description-box">
      <p class="product-short-description">${product.name}</p>
  </div>

  <span class="price">${product.priceText}</span>
  <div class="product-shipping"><i class="fa-solid fa-truck"></i>
      <p>Ücretsiz Kargo</p>
  </div>
  ${shippingFee(product.params.shippingFee)}
</div>
<div class="button-a">

  <button>Sepete Ekle</button>
</div>
</div>`);


  })

  lazyLoad(products);
}


function shippingFee(shipping) {

  if (shipping === "FREE") {
    $(".product-shipping").css('visibility', 'visible')
  }

  return "";

}

function lazyLoad(items) {
  let options = {
    root: document.querySelector('.product-container'),
    threshold: 0.5
  };

  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const entryId = entry.target.dataset.id;
      const item = items.find(x => x.productId === entryId);

      if (item && entry.isIntersecting) {
        const img = document.createElement('img');
        img.src = item['image'];

        entry.target.childNodes[1].appendChild(img);
        entry.target.classList.toggle('show');

        observer.unobserve(entry.target);
      }

    })
  }, options);

  let products = document.querySelectorAll('.product-card');

  products.forEach((product) => {
    observer.observe(product)
  });

}

const categoryMap = {
  "Size Özel": "Size Özel",
  "Tamir, Tadilat Gereçleri": "Yapı Market & Tamirat > Tamir, Tadilat Gereçleri",
  "Mobilya": "Ev, Dekorasyon, Bahçe > Mobilya",
  "Sağlık, Medikal": "Kozmetik & Kişisel Bakım > Sağlık, Medikal",
  "Dizüstü Bilgisayar (Laptop)": "Bilgisayar, Tablet > Dizüstü Bilgisayar (Laptop)",
  "Isıtma, Soğutma Sistemi": "Beyaz Eşya & Küçük Ev Aletleri > Isıtma, Soğutma Sistemi"
}

$(document).ready(function () {

  const productContainers = [...document.querySelectorAll('.product-container')];

  $('.nxt-btn img').click(function () {
    productContainers.forEach((item, i) => {
      item.scrollLeft += 550;
    })
  });

  $('.pre-btn img').click(function () {
    productContainers.forEach((item, i) => {
      item.scrollLeft -= 550;
    })
  });
  
  let timer = null;

  $('.product-container').on('click', '.button-a', function () {

    if (timer) {

      clearTimeout(timer);
      timer = null;

    }

    if ($('.alert').hasClass("show")) {

      $('.alert').removeClass("showAlert")
      $('.alert').removeClass("show")

      setTimeout(function () {
        $('.alert').addClass("show")
        $('.alert').addClass("showAlert")
      }, 100);

    } else {

      $('.alert').addClass("show")
      $('.alert').removeClass("hide")
      $('.alert').addClass("showAlert")
    }

    timer = setTimeout(function () {
      waitFunction();
      clearTimeout(timer);
      timer = null;
    }, 2000);

    function waitFunction() {

      $('.alert').removeClass("show");
      $('.alert').addClass("hide");

    }

  });

  $('.close-btn').click(function () {
    $('.alert').removeClass("show");
    $('.alert').addClass("hide");
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
  
    $.getJSON("product-list.json", function (result) {
      showProducts(result, categoryMap[categoryName]);
    });
  });

});






