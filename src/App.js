import React, { Component } from "react";
import styles from "./App.module.css";
import * as fetch from "./components/services/images-api";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";

export default class App extends Component {
  state = {
    items: [],
    searchQuery: "",
    pageNumber: 1,
    isLoading: false,
    isModalOpen: false,
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber
    ) {
      this.onSearch(searchQuery, pageNumber);
    }
  }

  SubmitSearchBar = (text) => {
    this.setState({
      searchQuery: text,
      items: [],
      pageNumber: 1,
    });
  };

  onSearch = (searchQuery, pageNumber) => {
    const { scrollHeight } = document.documentElement;

    this.setState({
      isLoading: true,
    });

    fetch
      .fetchImages(searchQuery, pageNumber)
      .then((res) => {
        if (searchQuery === "") {
          return alert("Please, enter a text!");
        }
        if (res.data.hits.length < 1) {
          return alert("Something wrong!");
        } else {
          this.setState((state) => ({
            items: [...state.items, ...res.data.hits],
          }));
        }
      })
      .catch((error) => alert("Something wrong"))
      .finally(() => {
        window.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });

        this.setState({
          isLoading: false,
        });
      });
  };

  onLoadMore = () => {
    this.setState((state) => ({
      pageNumber: state.pageNumber + 1,
    }));
  };
  openModal = (e) => {
    if (e.currentTarget !== e.target) {
      const URL = e.target.alt;
      this.setState({ isModalOpen: true, largeImageURL: URL });
    }
  };
  toggleModal = (img) => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
      largeImageURL: img,
    }));
  };
  // openModal = (img) => {
  //   this.setState((prevState) => ({
  //     isModalOpen: prevState.isModalOpen,
  //     largeImageURL: img,
  //   }));
  // };
  onLargeImgClick = ({ largeImageURL }) => {
    this.setState({ largeImageURL: largeImageURL });
  };
  closeModal = (e) => {
    if (e.code === "Escape" || e.currentTarget === e.target) {
      this.setState({ isModalOpen: false });
    }
  };
  render() {
    const { items, isLoading, isModalOpen, largeImageURL } = this.state;
    return (
      <div className={styles.App}>
        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        <SearchBar onSubmit={this.SubmitSearchBar} />
        <ImageGallery
          images={items}
          onOpenModal={this.toggleModal}
          onLargeImgClick={this.onLargeImgClick}
        />
        {isLoading && <Loader />}
        {items.length > 0 && <Button onLoadMore={this.onLoadMore} />}
      </div>
    );
  }
}
