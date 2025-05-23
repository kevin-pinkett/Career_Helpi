import "./Header.css";
import { Button } from "react-bootstrap";
import { SettingsPopup } from "../settings/Settings";

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
  disabled: boolean;
}

/** Copilot Generated Doc
 * 
 * Header component that renders a navigation bar with buttons to switch between different pages.
 *
 * @param {HeaderProps} props - The properties for the Header component.
 * @param {string} props.page - The current active page.
 * @param {(page: string) => void} props.setPage - Function to update the current active page.
 *
 * @returns {JSX.Element} A JSX element representing the header navigation bar.
 *
 * The Header component contains the following buttons:
 * - Home Page: Navigates to the home page. Disabled if the current page is "homePage".
 * - Basic Quiz: Navigates to the basic quiz page. Disabled if the current page is "basicPage".
 * - Detailed Quiz: Navigates to the detailed quiz page. Disabled if the current page is "detailedPage".
 * - FAQ: Navigates to the FAQ page. Disabled if the current page is "faqPage".
 *
 * Each button uses the `setPage` function to update the current page state when clicked.
 */
export function Header({ page, setPage, disabled}: HeaderProps) {
  const homeState = () => {
    setPage("homePage");
  };
  const basicButtonState = () => {
    setPage("basicPage");
  };
  const detailedButtonState = () => {
    setPage("detailedPage");
  };
  const faqState = () => {
    setPage("faqPage");
  };
  const aiState = () => {
    setPage("aiPage");
  }

  return (
    <div className="Header">
      <div style={{ display: "flex", width: "100%"}}>
        <Button
          style={{ flex: 1, fontSize: "var(--small-text)"}}
          className="Header-Button"
          onClick={homeState}
          disabled={page === "homePage"}
        >
          Home Page
        </Button>
        <Button
          style={{ flex: 1, fontSize: "var(--small-text)" }}
          className="Header-Button"
          onClick={basicButtonState}
          disabled={page === "basicPage" || disabled}
        >
          Basic Quiz
        </Button>
        <Button
          style={{ flex: 1, fontSize: "var(--small-text)" }}
          className="Header-Button"
          onClick={detailedButtonState}
          disabled={page === "detailedPage" || disabled}
        >
          Detailed Quiz
        </Button>
        <Button
          style={{ flex: 1, fontSize: "var(--small-text)" }}
          className="Header-Button"
          onClick={aiState}
          disabled={page === "aiPage" || disabled}
          >
          Custom Quiz
          </Button>
        <Button
          style={{ flex: 1, fontSize: "var(--small-text)" }}
          className="Header-Button"
          onClick={faqState}
          disabled={page === "faqPage"}
        >
          FAQ
        </Button>
        <SettingsPopup></SettingsPopup>
      </div>
    </div>
  );
}
