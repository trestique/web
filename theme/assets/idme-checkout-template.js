(function() {
  var cartContainer = document.getElementById("CartContainer");
  var checkouts = document.getElementsByClassName('order-summary__section--discount')
  var checkout = checkouts[checkouts.length - 1];

  var idme = `<div class="idme">
    <div class="idme-shopify">
      <p class='idme-btn-affinity'>Alumni, Government Employees, Hospital Employees, Medical Providers, Military, Nurses, First Responders, Students, and Teachers receive 20% off</p>
      <a class="idme-btn-unify" href="https://discountify.id.me/oauth/checkpoint/trestique1" >
        <img src="https://s3.amazonaws.com/idme/developer/idme-buttons/assets/img/verify.svg" alt="ID.me" style="height:42px"/>
      </a>
    </div>
  </div>`;


   checkout && checkout.insertAdjacentHTML("afterend", idme);
})();

