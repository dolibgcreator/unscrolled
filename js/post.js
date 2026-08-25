/* =========================================================
   UNSCROLLED
   POST INTERACTIONS
========================================================= */



/* =========================================================
   CURRENT POST
========================================================= */

const currentUrl = window.location.href;

const currentTitle = document.title;



/* =========================================================
   SHARE MENU
========================================================= */

const shareButton =
    document.getElementById("shareButton");

const shareMenu =
    document.getElementById("shareMenu");


if (shareButton && shareMenu) {

    shareButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            shareMenu.classList.toggle(
                "is-open"
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !shareMenu.contains(event.target) &&
                !shareButton.contains(event.target)
            ) {

                shareMenu.classList.remove(
                    "is-open"
                );

            }

        }
    );

}



/* =========================================================
   COPY LINK
========================================================= */

const copyLinkButton =
    document.getElementById(
        "copyLinkButton"
    );


if (copyLinkButton) {

    copyLinkButton.addEventListener(
        "click",
        async function () {

            try {

                await navigator.clipboard.writeText(
                    currentUrl
                );


                const label =
                    copyLinkButton.querySelector(
                        "span"
                    );


                const oldText =
                    label.textContent;


                label.textContent =
                    "copied";


                setTimeout(
                    function () {

                        label.textContent =
                            oldText;

                    },
                    1400
                );

            }

            catch (error) {

                console.error(
                    "Could not copy link.",
                    error
                );

            }

        }
    );

}



/* =========================================================
   WHATSAPP
========================================================= */

const whatsappShare =
    document.getElementById(
        "whatsappShare"
    );


if (whatsappShare) {

    whatsappShare.href =
        "https://wa.me/?text=" +
        encodeURIComponent(
            currentTitle +
            "\n" +
            currentUrl
        );

}



/* =========================================================
   X
========================================================= */

const xShare =
    document.getElementById("xShare");


if (xShare) {

    xShare.href =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(
            currentTitle
        ) +
        "&url=" +
        encodeURIComponent(
            currentUrl
        );

}



/* =========================================================
   EMAIL
========================================================= */

const emailShare =
    document.getElementById(
        "emailShare"
    );


if (emailShare) {

    emailShare.href =
        "mailto:?subject=" +
        encodeURIComponent(
            currentTitle
        ) +
        "&body=" +
        encodeURIComponent(
            currentTitle +
            "\n\n" +
            currentUrl
        );

}



/* =========================================================
   MESSENGER
========================================================= */

const messengerShare =
    document.getElementById(
        "messengerShare"
    );


if (messengerShare) {

    messengerShare.addEventListener(
        "click",
        function () {

            /*
               Messenger does not offer a simple universal
               web share URL like WhatsApp or X.

               On phones this attempts to open the
               Messenger app directly.
            */

            const messengerUrl =
                "fb-messenger://share/?link=" +
                encodeURIComponent(
                    currentUrl
                );


            window.location.href =
                messengerUrl;

        }
    );

}



/* =========================================================
   COMMENT PANEL
========================================================= */

const commentButton =
    document.getElementById(
        "commentButton"
    );

const commentPanel =
    document.getElementById(
        "commentPanel"
    );


if (commentButton && commentPanel) {

    commentButton.addEventListener(
        "click",
        function () {

            commentPanel.classList.toggle(
                "is-open"
            );


            if (
                commentPanel.classList.contains(
                    "is-open"
                )
            ) {

                const nicknameInput =
                    document.getElementById(
                        "commentNickname"
                    );


                setTimeout(
                    function () {

                        nicknameInput.focus();

                    },
                    100
                );

            }

        }
    );

}



/* =========================================================
   COMMENT ELEMENTS
========================================================= */

const commentForm =
    document.getElementById(
        "commentForm"
    );

const nicknameInput =
    document.getElementById(
        "commentNickname"
    );

const commentInput =
    document.getElementById(
        "commentText"
    );

const commentsList =
    document.getElementById(
        "commentsList"
    );



/* =========================================================
   STORAGE KEY
========================================================= */

const commentStorageKey =
    "unscrolled-comments-" +
    window.location.pathname;



/* =========================================================
   LOAD COMMENTS
========================================================= */

function loadComments() {

    if (!commentsList) {
        return;
    }


    const storedComments =
        localStorage.getItem(
            commentStorageKey
        );


    if (!storedComments) {
        return;
    }


    try {

        const comments =
            JSON.parse(
                storedComments
            );


        comments.forEach(
            function (comment) {

                renderComment(
                    comment
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Could not load comments.",
            error
        );

    }

}



/* =========================================================
   SAVE COMMENT
========================================================= */

function saveComment(comment) {

    let comments = [];


    const storedComments =
        localStorage.getItem(
            commentStorageKey
        );


    if (storedComments) {

        try {

            comments =
                JSON.parse(
                    storedComments
                );

        }

        catch (error) {

            comments = [];

        }

    }


    comments.push(comment);


    localStorage.setItem(
        commentStorageKey,
        JSON.stringify(
            comments
        )
    );

}



/* =========================================================
   RENDER COMMENT
========================================================= */

function renderComment(comment) {

    if (!commentsList) {
        return;
    }


    const article =
        document.createElement(
            "article"
        );


    article.className =
        "reader-comment";



    const nickname =
        document.createElement(
            "div"
        );


    nickname.className =
        "reader-comment-name";


    nickname.textContent =
        comment.nickname;



    const text =
        document.createElement(
            "p"
        );


    text.className =
        "reader-comment-text";


    text.textContent =
        comment.text;



    article.appendChild(
        nickname
    );


    article.appendChild(
        text
    );


    commentsList.appendChild(
        article
    );

}



/* =========================================================
   SUBMIT COMMENT
========================================================= */

if (
    commentForm &&
    nicknameInput &&
    commentInput
) {

    commentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nickname =
                nicknameInput.value.trim();


            const text =
                commentInput.value.trim();


            if (!nickname || !text) {
                return;
            }


            const comment = {

                nickname: nickname,

                text: text,

                date:
                    new Date().toISOString()

            };


            saveComment(
                comment
            );


            renderComment(
                comment
            );


            commentInput.value = "";


            commentInput.focus();

        }
    );

}



/* =========================================================
   INITIAL LOAD
========================================================= */

loadComments();