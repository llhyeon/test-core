import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import resetCss from "../Layout/resetCss";

@customElement("new-post")
class NewPost extends LitElement {
  static styles: CSSResultGroup = [
    resetCss,
    css`
      .container {
        padding: 2rem;
        margin: 0 auto;

        .wrapper {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 400px;
        }

        & input {
          padding: 0.5rem;
          border: 1px solid white;
          width: 100%;
        }
      }

      .buttonGroup {
        text-align: center;

        & button {
          padding: 0.5rem 1rem;
          border: 1px solid white;
          cursor: pointer;
          margin-top: 2rem;
        }

        .add {
          background-color: dodgerblue;
          color: white;
        }
      }
    `,
  ];

  handleNewPost() {
    console.log(this.inputs);
  }

  get inputs() {
    return this.renderRoot.querySelectorAll<HTMLInputElement>("input");
  }

  render() {
    console.log(this.inputs);
    return html`
      <div class="container">
        <div class="wrapper">
          <div class="brand">
            <label for="brand">브랜드</label>
            <input type="text" id="brand" />
          </div>

          <div class="visual">
            <label for="imgField"></label>
            <input type="file" id="imgField" />
            <div class="render"></div>
          </div>

          <div class="desc">
            <label for="description">상품 설명</label>
            <input type="text" id="description" />
          </div>

          <div class="price">
            <label for="price">가격</label>
            <input type="text" id="price" />
          </div>

          <div class="discount">
            <label for="discount">할인율(%)</label>
            <input type="text" id="discount" />
          </div>

          <div class="buttonGroup">
            <button type="button" class="cancel">취소</button>
            <button @click=${this.handleNewPost} type="button" class="add">추가</button>
          </div>
        </div>
      </div>
    `;
  }
}
