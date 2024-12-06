import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Auth } from "../@types/type";
import resetCss from "./resetCss";
import Swal from "sweetalert2";
import pb from "../api/pocketbase";

@customElement("c-header")
class Header extends LitElement {
  @state() private loginData: Auth = {} as Auth;

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
    this.loginData = auth;
  }

  handleLogout(e: Event) {
    e.preventDefault();

    Swal.fire({
      title: "로그아웃",
      text: "로그아웃 하시겠습니까 ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        localStorage.removeItem("auth");
        pb.authStore.clear();
        // this.loginData.isAuth = false;
        // this.requestUpdate();
        location.reload();
      }
    });
  }

  static styles: CSSResultGroup = [
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

  render() {
    const { isAuth, user } = this.loginData;
    return html`
      <header>
        <h1 class="logo">
          <a href="/"><img width="30" src="/logo.png" alt="3D 호랑이" /></a>
          <span>HypeCart</span>
        </h1>
        <nav>
          <ul>
            <li><a href="#">About</a></li>
            ${!isAuth
              ? html`<li><a href="/src/pages/login/">Login</a></li>`
              : html` <li>
                  <div>
                    <span>${user.name}님</span>
                    <a @click=${this.handleLogout} href="/src/pages/logout/">Logout</a>
                  </div>
                </li>`}
            <li><a href="/src/pages/product/">Product</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}
