// import { COLLECTIONS } from "@/constants";
// import { store } from "@/remote/firebase";
import { css } from "@emotion/react";
import { RxCross2 } from "react-icons/rx";
import styled from "@emotion/styled";
// import { collection, endAt, onSnapshot, orderBy, query, startAt } from "firebase/firestore";
import { useEffect, useState } from "react";
import Badge from "./Badge";
import Flex from "./Flex";
import Spacing from "./Spacing";
import Text from "./Text";
import { Link } from "react-router-dom";
// import { cosmeticAtom } from "@/atom/cosmetic";

export default function BoardSearch() {
  const [post, setPost] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [inputQuery, setInputQuery] = useState("");

  // const setCosmetic = useSetRecoilState();

  const onChange = (e) => {
    // setInputQuery(e?.target?.value?.trim());
    // setIsFocus(true);
    // if (e?.target?.value) {
    //   setCosmetic(post);
    // } else {
    //   setCosmetic(null);
    // }
  };
  const onFocusHandler = () => {
    setIsFocus(true);
  };
  useEffect(() => {
    // let postQuery = query(
    //   collection(store, COLLECTIONS.COSMETIC),
    //   orderBy("name"),
    //   startAt(inputQuery),
    //   endAt(inputQuery + "\uf8ff")
    // );
    // onSnapshot(postQuery, (snapShot) => {
    //   let dataObj = snapShot?.docs?.map((doc) => ({
    //     ...doc?.data(),
    //     id: doc?.id,
    //   }));
    //   setPost(dataObj);
    // });
  }, [inputQuery]);

  const onEnter = (e) => {
    // if (e.keyCode === 13) {
    //   if (e?.target?.value) {
    //     setCosmetic(post);
    //   } else {
    //     setCosmetic(null);
    //   }
    // }
  };

  return (
    <SearchContainer onClick={() => setIsFocus((pre) => !pre)}>
      <Flex align={"center"}>
        <input
          type="text"
          placeholder="'상품명' 으로 검색하기"
          onFocus={onFocusHandler}
          onChange={onChange}
          onKeyUp={onEnter}
        />
        <Spacing size={10} direction="horizontal" />
        <RxCross2 size={28} color={"#121212"} />
      </Flex>
      {isFocus ? (
        <PostContainer>
          {post?.length > 0 ? (
            <Flex direction="column">
              {post.map((post) => {
                return (
                  <Link to={`/cosmetic/detail/${post.id}`}>
                    <Flex align={"center"} css={lowStyle}>
                      <Flex css={badgeStyle}>
                        <Badge label={post.brand_name} color={"#f0f0f0"} />
                      </Flex>
                      <Flex>
                        <Text typography="t17" color="fontBlack">
                          {post.name}
                        </Text>
                      </Flex>
                    </Flex>
                    {/* <Spacing size={10} /> */}
                  </Link>
                );
              })}
            </Flex>
          ) : (
            <Text typography="t13" color="fontBlack">
              검색 결과가 없습니다.
            </Text>
          )}
        </PostContainer>
      ) : null}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  background-color: #f8f8f8;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px 20px;

  & input {
    min-width: 250px;
    width: 100%;
    height: 35px;
    border: none;
    /* border-radius: 30px; */
    padding: 0px 20px;
    font-size: 12px;
    transition: 1s;

    @media (min-width: 600px) {
      min-width: 500px;
      transition: 1s;
    }
  }
`;
const badgeStyle = css`
  min-width: 200px;

  @media (max-width: 600px) {
    min-width: 100px;
  }
`;
const lowStyle = css`
  padding: 8px 10px;
`;
const PostContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px -2px #eee;
  min-height: 100px;
  border: 0.5px solid #eee;
  width: 80%;
  top: 90px;
  border-radius: 5px;
  padding: 10px 20px;
`;
