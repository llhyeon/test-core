import "@/pages/detail/detail.css";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import Swal from "sweetalert2";

function render() {
  const tag = /* html */ `
    <div class="container">
      <div class="buttonGroup">
        <button type="button" class="cancel">취소</button>
        <button type="button" class="modify">수정</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", tag);
  renderProduct();
}

async function renderProduct() {
  const urlParams = new URLSearchParams(location.search);
  // 쿼리스트링 입력
  const id = urlParams.get("product");
  const product = await pb.collection("products").getOne(id);
  const { brand, description, price, discount } = product;

  const tag = /* html */ `
      <div class="wrapper">
        <div class="brand">
          <label for="brand">브랜드</label>
          <input type="text" id="brand" value="${brand}"/>
        </div>
        <div class="visual">
          <img src="${getPbImageURL(product)}" alt="" />
        </div>

        <div class="desc">
          <label for="description">상품 설명</label>
          <input type="text" id="description" value="${description}"/>
        </div>
        <div class="price">
          <label for="price">가격</label>
          <input type="text" id="price" value="${price}"/>
        </div>
        <div class="discount">
          <label for="discount">할인율</label>
          <input type="text" id="discount" value="${discount}"/>
        </div>
        <div class="real-price">${price - price * discount * 0.01}원</div>
      </div>
  `;

  document.querySelector(".container").insertAdjacentHTML("afterbegin", tag);
  detail(product, id);
}

function detail(product, id) {
  const { price, discount } = product;
  const priceInput = document.querySelector("#price");
  const discountInput = document.querySelector("#discount");
  const cancel = document.querySelector(".cancel");
  const modify = document.querySelector(".modify");

  function handleDiscount() {
    let newPrice = price;
    let newDiscount = discount;

    newPrice = priceInput.value;
    newDiscount = discountInput.value;

    const ratio = newPrice * (newDiscount * 0.01);
    const realPrice = newPrice - ratio;

    document.querySelector(".real-price").textContent = realPrice.toLocaleString() + "원";
  }

  function handleModify() {
    const brand = document.querySelector("#brand");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");
    const discount = document.querySelector("#discount");

    const data = {
      brand: brand.value,
      description: description.value,
      price: price.value,
      discount: discount.value,
    };

    pb.collection("products")
      .update(id, data)
      .then(() => {
        Swal.fire({
          text: "수정이 완료되었습니다.",
        }).then(() => {
          history.back();
        });
      })
      .catch(() => {
        Swal.fire({
          text: "에러가 발생했습니다.",
        });
      });
  }

  priceInput.addEventListener("input", handleDiscount);
  discountInput.addEventListener("input", handleDiscount);

  cancel.addEventListener(
    "click",
    () => history.back() // 뒤로 가는 함수
  );

  modify.addEventListener("click", handleModify);
}
render();
