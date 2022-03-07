import { useEffect, useState } from "react";
import './CookiesConscent.scss'

const CookieConscent = () => {

    const [cookieBTN, setCookieBTN] = useState(null)

    useEffect(() => {
        waitForElm('#axeptio_main_button').then((cookieBtn) => {
            setCookieBTN(cookieBtn)
        })
    }, [])

    const waitForElm = (selector) => {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    const onClickRGPD = () => {
        cookieBTN?.click()
    }

    return (
        <p className="rgpd" onClick={onClickRGPD}>Gestion des cookies <i className="fas fa-cookie"></i></p>
    );
};

export default CookieConscent;