import { LitElement, html, css } from "lit";
import resetCss from "./resetCss";

class Header extends LitElement {
  constructor() {
    super();
  }

  // CSS 파일을 두 개 이상 불러올 때
  static get styles() {
    return [
      resetCss,
      css`
        header {
          display: flex;
          justify-content: space-between;
          background-color: #fff;
          color: black;
          padding: 1rem;

          .logo {
            display: flex;
            align-items: center;
            gap: 0.3rem;

            span {
              font-size: 1rem;
            }
          }

          nav {
            display: flex;
            align-items: center;

            ul {
              display: flex;
              gap: 1rem;
            }
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <header>
        <h1 class="logo">
          <a href="/"><img width="30" src="/logo.png" alt="3D 호랑이" /></a>
          <span>HypeCart</span>
        </h1>
        <nav>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("c-header", Header);
