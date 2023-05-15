import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import DividerBig from "../../images/DividerBig.png";
import Cat from "../../images/Cat.png";
import DividerSmall from "../../images/DividerSmall.png";
import { useParams } from "react-router-dom";
import "./PostDetail.css";
import Pencil from "../../images/PencilTwo.png";
import Comment from "../../images/Comment.png";
import CommentFilled from "../../images/CommentFilled.png";
import Report from "../../images/Report.png";
import Trash from "../../images/Trash.png";
import Heart from "../../images/Heart.png";
import HeartFilled from "../../images/heartfilled.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { NavbarVTwo } from "../../components";
import { handleTimeSince } from "../../helpers/handleTimeSince";
import { SkeletonLayout } from "../../components";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
} from "@chakra-ui/react";

export function PostDetail() {
  const asciiEmojis = [
    "(ㆆ _ ㆆ)  -  Reacted Afraid",
    "•`_´•  -  Reacted Angry",
    "•͡˘㇁•͡˘  - Reacted Awkward",
    "(˵ ͡° ͜ʖ ͡°˵)  - Reacted Blush",
    "(-_-)  -  Reacted Bored",
    "※(^o^)/※  -  Reacted Cheerful",
    "(｡◕‿‿◕｡)  -  Reacted Cute",
    "ᕕ(⌐■_■)ᕗ ♪♬  -  Dance!",
    "<(^_^)>  -  Reacted Dope",
    "¯(°_o)/¯  - Reacted Dunno",
    "(҂◡_◡) ᕤ  -  Endure",
    "(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧  -  Reacted Excited",
    "(－‸ლ)  -  Face Palm",
    "(^-^)/  -  Reacted Grateful",
    "( ´◔ ω◔`) ノシ  -  Greetings",
    "٩(^‿^)۶  -  Reacted Happy",
    "(°Ω°)/  -  Help",
    "(づ｡◕‿‿◕｡)づ  -  Hug",
    "(˶‾᷄ ⁻̫ ‾᷅˵)  -  Reacted Pleased",
    "♥‿♥  -  Love",
    "t(ಠ益ಠt)  -  Reacted Mad",
    "ε(´סּ︵סּ`)з  -  Reacted Sad",
    "(๑•́ ヮ •̀๑)  -  Reacted Surprised",
    "(๑•̀ㅂ•́)ง✧  -  Reacted Victory",
  ];

  let { postid } = useParams();
  const [postData, setPostData] = useState(null);
  const [editingPost, setEditingPost] = useState(false);
  const [commentingOnPost, setCommentingOnPost] = useState(false);
  const [postAltered, setPostAltered] = useState(false);
  const [postComments, setPostComments] = useState(null);
  const [commentingOnPostValue, setCommentingOnPostValue] = useState("");
  const [postLiked, setPostLiked] = useState(false);
  const [userPostsLiked, setUserPostsLiked] = useState(null);
  const [currentAsciiMood, setCurrentAsciiMood] = useState(asciiEmojis[0]);
  const [asciiReactions, setAsciiReactions] = useState(null);

  console.log("post id from post detail: ", postid);
  console.log("post liked: ", postLiked);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${process.env.REACT_APP_BACKENDURL}posts/${postid}`)
        .then((response) => {
          console.log("specific post data all: ", response);
          setPostData(response.data);
          setEditedPostValue(response.data.postdescription);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      axios
        .get(`${process.env.REACT_APP_BACKENDURL}comments/post/${postid}`)
        .then((comments_response) => {
          console.log("comments for post: ", comments_response);
          setPostComments(
            comments_response.data.sort(function (a, b) {
              return new Date(b.commenttime) - new Date(a.commenttime);
            })
          );
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      axios
        .get(
          `${process.env.REACT_APP_BACKENDURL}users/${localStorage.getItem(
            "userid"
          )}/likepost`
        )
        .then((likedposts_response) => {
          console.log("liked posts: ", likedposts_response);
          setUserPostsLiked(likedposts_response.data);
          if (
            likedposts_response.data.filter(
              (likedpost) => likedpost.postid === postid
            ).length > 0
          ) {
            setPostLiked(true);
          } else {
            setPostLiked(false);
          }
          console.log(
            "filtered liked posts: ",
            likedposts_response.data.filter(
              (likedpost) => likedpost.postid === postid
            )
          );
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      axios
        .get(`${process.env.REACT_APP_BACKENDURL}ascii/${postid}/reactions`)
        .then((ascii_reactions_response) => {
          console.log(
            "ascii reactionsfor post: ",
            ascii_reactions_response.data
          );
          setAsciiReactions(ascii_reactions_response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, "1000");
  }, [postid, postAltered]);

  const navigate = useNavigate();

  // let postData = location.state?.postData;
  const [editedPostValue, setEditedPostValue] = useState(
    postData ? postData.postdescription : ""
  );

  const handleAsciiReaction = (e, ascii_emoji) => {
    e.preventDefault();

    // if they click

    const asciiBody = {
      ascii_string: ascii_emoji,
      postid: postid,
    };

    axios
      .post(
        `${
          process.env.REACT_APP_BACKENDURL
        }ascii/reaction/${localStorage.getItem("userid")}`,
        asciiBody
      )
      .then((response) => {
        console.log("ascii reaction response: ", response);

        setPostAltered(!postAltered);

        if (response.data === false) {
          axios
            .put(
              `${
                process.env.REACT_APP_BACKENDURL
              }ascii/add/reaction/${localStorage.getItem("userid")}`,
              asciiBody
            )
            .then((second_response) => {
              console.log("ascii reaction put response", second_response);
              setPostAltered(!postAltered);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    console.log("Ascii Reaction: ", ascii_emoji);
  };

  const handleCommentSubmission = (e) => {
    e.preventDefault();

    const commentBody = {
      commentText: commentingOnPostValue,
      userid: localStorage.getItem("userid"),
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKENDURL}comments/${postData.postid}/create`,
        commentBody
      )
      .then((response) => {
        console.log("edit response: ", response);

        setCommentingOnPost(false);
        setCommentingOnPostValue("");
        setPostAltered(!postAltered);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleLikeOrDislikePost = (e) => {
    e.preventDefault();

    const likeBody = {
      userid: localStorage.getItem("userid"),
    };

    if (!postLiked) {
      axios
        .put(
          `${process.env.REACT_APP_BACKENDURL}posts/${postData.postid}/likeincremented`,
          likeBody
        )
        .then((response) => {
          console.log("like incremented: ", response);

          setPostLiked(true);
          setPostAltered(!postAltered);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BACKENDURL}posts/likedecremented/${postData.postid}`,
          likeBody
        )
        .then((response) => {
          console.log("like decremented: ", response);

          setPostLiked(false);
          setPostAltered(!postAltered);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  const handleEditPostDescription = (e) => {
    e.preventDefault();

    const postBody = {
      postdescription: editedPostValue,
    };

    axios
      .put(
        `${process.env.REACT_APP_BACKENDURL}posts/${postData.postid}/editdescription`,
        postBody
      )
      .then((response) => {
        console.log("edit response: ", response);

        setEditingPost(false);
        setEditedPostValue(
          postData.postdescription ? postData.postdescription : ""
        );
        setPostAltered(!postAltered);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDeletePost = (e) => {
    e.preventDefault();

    console.log("make sure postid exists: ", postData.postid);

    axios
      .delete(`${process.env.REACT_APP_BACKENDURL}posts/${postData.postid}`)
      .then((response) => {
        console.log("delete response: ", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // setPostsRefresh(!refreshPosts);
    navigate(ROUTES.PROMPT);

    console.log("Deleted Post");
  };

  return (
    <>
      {postData ? (
        <>
          <NavbarVTwo />
          <div className="post-page-post-page">
            <div className="post-page-content">
              <div className="post-page-tag">
                <button
                  onClick={() => {
                    navigate(ROUTES.PROMPT);
                  }}
                  className="post-page-div"
                >
                  &lt;-
                </button>
              </div>
              <div className="post-page-b">
                {editingPost ? (
                  <>
                    <textarea
                      value={editedPostValue}
                      onChange={(e) => setEditedPostValue(e.target.value)}
                      className="editing-input"
                      placeholder="Edit your post here..."
                      maxLength="500"
                    />
                    <button
                      onClick={(e) => handleEditPostDescription(e)}
                      className="save-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingPost(false);
                        setEditedPostValue(
                          postData.postdescription
                            ? postData.postdescription
                            : ""
                        );
                      }}
                      className="save-button"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <h1 className="post-page-don-t-eat-before-bed-just-finished-a-sandwich">
                    {postData.postdescription && postData.postdescription}
                  </h1>
                )}
                {postData.attachment ? (
                  postData.isvideo ? (
                    <iframe
                      className="post-image-attachment-user-hello"
                      src={postData.attachment}
                      alt="post_image"
                      title="attachment"
                      scrolling="no"
                    />
                  ) : (
                    <img
                      className="post-image-attachment-user-hello"
                      src={postData.attachment}
                      alt="post_image"
                    />
                  )
                ) : null}
                {postData.ascii_mood && (
                  // <div className="mood-backing">
                  <h3 className="mood-backing">{postData.ascii_mood}</h3>
                  // </div>
                )}
                <p className="post-date-posted">
                  {handleTimeSince(new Date(postData.posttime))} ago
                </p>
                {postData.userid &&
                  postData.userid === localStorage.getItem("userid") && (
                    <div className="post-page-component-two">
                      <button onClick={(e) => handleDeletePost(e)}>
                        <img
                          className="trash-icon"
                          alt={"Material symbols report outline"}
                          src={Trash}
                        />
                      </button>
                      <button onClick={() => setEditingPost(!editingPost)}>
                        <img
                          className="trash-icon"
                          alt={"Material symbols report outline"}
                          src={Pencil}
                        />
                      </button>
                    </div>
                  )}
              </div>
              <img
                className="divider-small negative-margin"
                src={DividerBig}
                alt="Divider Big"
              />
              <div className="post-page-b-2">
                <p className="post-page-p">Any thoughts you Want to leave?</p>
                <div className="post-page-component">
                  <button onClick={(e) => handleLikeOrDislikePost(e)}>
                    {postLiked ? (
                      userPostsLiked ? (
                        userPostsLiked.filter(
                          (likedpost) => likedpost.postid === postid
                        ).length > 0 ? (
                          <img
                            className=""
                            alt={"Icon heart"}
                            src={HeartFilled}
                          />
                        ) : (
                          <img className="" alt={"Icon heart"} src={Heart} />
                        )
                      ) : (
                        <img className="" alt={"Icon heart"} src={Heart} />
                      )
                    ) : (
                      <img className="" alt={"Icon heart"} src={Heart} />
                    )}
                  </button>

                  <button
                    onClick={() => setCommentingOnPost(!commentingOnPost)}
                  >
                    <img
                      className=""
                      alt={"Icon pencil"}
                      src={commentingOnPost ? CommentFilled : Comment}
                    />
                  </button>
                  {postData.userid &&
                    postData.userid !== localStorage.getItem("userid") && (
                      <Link to={`/post/${postData.postid}/report`}>
                        <img
                          className=""
                          alt={"Material symbols report outline"}
                          src={Report}
                        />
                      </Link>
                    )}
                  <br />
                </div>

                {commentingOnPost && (
                  <>
                    <textarea
                      value={commentingOnPostValue}
                      onChange={(e) => setCommentingOnPostValue(e.target.value)}
                      className="commenting-input"
                      placeholder="Type your comment here..."
                      maxLength="500"
                    />
                    <div className="comment-box-component">
                      <button
                        onClick={(e) => handleCommentSubmission(e)}
                        className="save-button"
                      >
                        Comment -&gt;
                      </button>
                    </div>
                  </>
                )}
                <p className="post-page-p-2">React to the post!</p>
                <Menu>
                  <MenuButton
                    mr="auto"
                    mt={4}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {currentAsciiMood}
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Mood: ">
                      {asciiEmojis.map((emoji, id) => (
                        <>
                          <MenuItem
                            onClick={(e) => handleAsciiReaction(e, emoji)}
                            key={id}
                          >
                            {emoji}
                          </MenuItem>
                        </>
                      ))}
                    </MenuGroup>
                  </MenuList>
                </Menu>
                {/* <button>Select</button> */}
              </div>
              <img
                className="divider-small"
                src={DividerSmall}
                alt="DividerSmall"
              />
              <div className="prompt-page-div">
                <p className="prompt-page-here-s-what-people-think-tap-on-them-to-see-the-details">
                  <span className="prompt-page-text-wrapper-3">
                    See how <br />
                  </span>
                  <span className="prompt-page-text-wrapper-4">
                    People Reacted.
                    <br />
                  </span>
                  <br />
                  {asciiReactions &&
                    asciiReactions.map((reaction, key) => (
                      <button
                        onClick={(e) =>
                          handleAsciiReaction(e, reaction.ascii_string)
                        }
                        className="ascii-reaction"
                      >
                        {reaction.ascii_string}{" "}
                        <span className="border-circle">+{reaction.total}</span>
                      </button>
                    ))}

                  <img
                    className="divider-small negative-margin"
                    src={DividerBig}
                    alt="Divider Big"
                  />
                </p>
              </div>
              <div className="prompt-page-div">
                <p className="prompt-page-here-s-what-people-think-tap-on-them-to-see-the-details">
                  <span className="prompt-page-text-wrapper-3">
                    Here’s what <br />
                  </span>
                  <span className="prompt-page-text-wrapper-4">
                    People <br />
                    Commented.
                    <br />
                  </span>
                  {/* <br /> */}
                  {/* <img
                    className="divider-small negative-margin"
                    src={DividerBig}
                    alt="Divider Big"
                  /> */}
                </p>
              </div>
              {postComments && postComments.length > 0 ? (
                postComments.map((comment, id) => (
                  <>
                    <div className="post-page-p-wrapper" key={id}>
                      <p className="post-page-text-wrapper-2">
                        {comment.commenttext}
                      </p>
                      <p className="post-date-posted">
                        {handleTimeSince(new Date(comment.commenttime))} ago
                      </p>
                    </div>
                    {comment.userid &&
                      comment.userid === localStorage.getItem("userid") && (
                        <div className="post-page-component-three">
                          <button>
                            <img
                              className="comment-trash-icon"
                              alt={"Material symbols report outline"}
                              src={Trash}
                            />
                          </button>
                        </div>
                      )}
                    <img
                      className="divider-small"
                      src={DividerSmall}
                      alt="DividerSmall"
                    />
                  </>
                ))
              ) : (
                <>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    <p className="post-page-no-comments">
                      Be the first to comment! &lt;･◡･&gt;
                    </p>
                  </button>
                  <img
                    className="divider-small negative-margin"
                    src={DividerBig}
                    alt="Divider Big"
                  />
                </>
              )}

              <div className="post-page-b-cat">
                <p className="post-page-p">
                  Pet this cat <br />
                  And you will go
                  <br />
                  Back to top.
                </p>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  <img className="cat-image" src={Cat} alt="Cat" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <SkeletonLayout />
      )}
    </>
  );
}
