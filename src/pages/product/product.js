// "http://127.0.0.1:8090/api/api/collections/products/records";
import getPbImageURL from "@/api/getPbImageURL";

console.log(); // vite에서만 사용 가능

async function renderProduct() {
  const response = await fetch(`${import.meta.env.VITE_PB_API}/collections/products/records`);
  const data = await response.json();

  const { items } = data;

  const tag = /* html */ `
          <div class="container">
            <ul>
              ${items
                .map((item) => {
                  return /* html */ `
                    <li>
                      <a href="/">
                        <figure>
                          <img src=${getPbImageURL(item)} alt="" />
                        </figure>
                        <span class="brand">${item.brand}</span>
                        <span class="description">${item.description}</span>
                        <span class="price">${item.price}</span>
                        <div>
                          <span class="discount">${item.discount}%</span>
                          <span class="real-price">${(
                            (item.price * (100 - item.discount)) /
                            100
                          ).toLocaleString()}원</span>
                        </div>
                      </a>
                    </li>
                  `;
                })
                .join("")}
            </ul>
          </div>
    `;
  document.body.insertAdjacentHTML("beforeend", tag);
}

renderProduct();
