import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getImages, __deleteImages } from "../../redux/modules/mySlice";
import cancelSvg from "../../assets/img/cancelSvg.svg";
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import Modal from "../utils/Modal";

const ProfilePhotos = () => {
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectImgId, setSelectImgId] = useState(1);
  const [selectImg, setSelectImg] = useState("");
  const [selectImgIndex, setSelectImgIndex] = useState(0);

  const { userInfo } = useSelector((state) => state.my);
  const { images } = useSelector((state) => state.my);
  console.log("images", images);
  // console.log("userInfo", userInfo);
  console.log(selectImgId);

  // 1
  const onClickFullScreenImgsHandler = (e) => {
    const { id } = e.target;
    console.log("e.target.id", id);
    selectImgFunc(id);

    // console.log('userInfo', userInfo.imgList, userInfo.imgList.length);
  };

  // 2
  const selectImgFunc = (id) => {
    const data = images.filter((data) => data.id === Number(id));
    // console.log("filter data", data);

    setSelectImgId(id);
    setSelectImg(data[0].imageUrl);
    setFullScreen(true);

    // const data = userInfo.imgList.filter((data) => data.id === Number(id));
    // const index = userInfo.imgList.indexOf(...data);
    // setSelectImgIndex(index);
  };

  const onClickPrevHandler = () => {
    const prevData = userInfo.imgList[selectImgIndex - 1];
    setSelectImgId(prevData.id);
    setSelectImg(prevData);
    setSelectImgIndex((prev) => prev - 1);
    // console.log('prevData', prevData);
  };

  const onClickNextHandler = () => {
    const nextData = userInfo.imgList[selectImgIndex + 1];
    setSelectImgId(nextData.id);
    setSelectImg(nextData);
    setSelectImgIndex((prev) => prev + 1);
    // console.log('nextData', nextData);
  };

  const onClickFullScreenCloseHandler = () => {
    setFullScreen(false);
  };

  const onClicOptionModalOpenHandler = () => {
    setModalVisible(true);
  };

  const onClickDeleteImgHandler = () => {
    dispatch(__deleteImages(selectImgId));
    setFullScreen(false);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const nickname = localStorage.getItem("nickname");
  // console.log("nickname", nickname);

  useEffect(() => {
    dispatch(__getImages(nickname));
  }, [dispatch]);
  // console.log("selectImg", selectImg);
  return (
    <>
      <StContainer>
        {/* {userInfo &&
          userInfo.imgList.map((data) => (
            <StImg key={data.id} onClick={onClickFullScreenImgsHandler}>
              <img id={data.id} src={data.imgUrl} alt="boast" />
            </StImg>
          ))} */}
        {images &&
          images.map((data) => (
            <StImg key={data.id} onClick={onClickFullScreenImgsHandler}>
              <img id={data.id} src={data.imageUrl} alt="boast" />
            </StImg>
          ))}
      </StContainer>
      {fullScreen ? (
        <StFullScreen>
          <div className="header">
            <div className="cancelBox" onClick={onClickFullScreenCloseHandler}>
              <img src={cancelSvg} alt="cancelBtn" />
            </div>
            <div className="imgCount">
              {/* {images && (
                <span>
                  {selectImgIndex + 1}/{images.length}
                </span>
              )} */}
            </div>
            <div className="optionBox">
              <img
                src={threeDotSvg}
                alt="optionBtn"
                onClick={onClicOptionModalOpenHandler}
              />
            </div>
          </div>
          <StSliderBox>
            <div className="imgBox" key={selectImgId}>
              {/* {selectImgIndex === 0 ? null : (
                <button className="prev" onClick={onClickPrevHandler}>
                  ◀
                </button>
              )} */}
              <img src={selectImg} alt="img" id={selectImgId} />
              {/* {images.length - 1 === selectImgIndex ? null : (
                <button className="next" onClick={onClickNextHandler}>
                  ▶
                </button>
              )} */}
            </div>
          </StSliderBox>
        </StFullScreen>
      ) : null}

      <StModalBox>
        {modalVisible && (
          <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            width="250px"
            height="150px"
            radius="20px"
            top="40%"
            backgroundcolor="rgba(0, 0, 0, 0.2)"
          >
            <div className="btnBox">
              <StModalBtn onClick={onClickDeleteImgHandler}>삭제</StModalBtn>
              <StModalBtn onClick={closeModal}>취소</StModalBtn>
            </div>
          </Modal>
        )}
      </StModalBox>
    </>
  );
};

const StContainer = styled.div`
  width: 100%;
  height: 50vh;
  background-color: #f8f8f8;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 100px;
  grid-gap: 2px;
  padding-bottom: 70px;

  /* overflow-y: scroll; */
`;

const StImg = styled.div`
  height: 100px;

  & img {
    width: 100%;
    height: 100px;
  }
`;

const StSliderBox = styled.div`
  width: 100%;
  height: 500px;
  z-index: 15;
  padding-top: 50px;
  box-sizing: border-box;

  & div.imgBox {
    width: 100%;
    height: 450px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      background-size: contain;
    }

    button {
      position: absolute;
      border: none;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      color: #111;
      top: 50%;
      box-sizing: border-box;
    }

    button.prev {
      left: 0;
    }

    button.next {
      right: 0;
    }
  }
`;

const StFullScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #5f5f5f;
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  & .header {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
  }
  .cancelBox {
    width: 15px;
    height: auto;

    img {
      width: 100%;
    }
  }

  .imgCount {
    color: #fff;
  }

  .optionBox {
    img {
      transform: rotate(90deg);
    }
  }
`;

const StModalBox = styled.div`
  & .btnBox {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    flex-direction: column;
  }
`;
const StModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  outline: none;
  border: none;
  border-bottom: 1px solid #eee;
  background-color: white;
  color: #ff8f27;

  margin-top: 5%;

  &:last-child {
    border-bottom: none;
  }
`;

export default ProfilePhotos;
