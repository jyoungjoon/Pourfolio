import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CELLAR_BY_USER_ID, GET_USER_REVIEWS } from '../utils/queries';
import Auth from '../utils/auth';
import StarRating from '../ui/StarRating';
import { SAVE_REVIEW } from '../utils/mutations';
import { useLocation } from 'react-router-dom';

const StyledCellar = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  display: flex;
`;

const Header = styled.h1`
  display: inline-block;
  font-family: 'Oswald', sans-serif;
  font-size: 14rem;
  transform: rotate(270deg) translateY(-3rem);
  text-transform: lowercase;
  color: #fa9f45;
  &:hover,
  &:active {
    span {
      transform: scale(1, 1) translateY(0rem);
    }
  }

  span {
    font-size: 14rem;
    transform: scale(-1, -1) translateY(-4.75rem);
    display: inline-block;
    color: #ffffff;
  }
`;

const ProfileCard = styled.div`
  height: 65rem;
  width: 50rem;
  background-color: white;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

const StyledWineCard = styled.div`
  background-color: white;
  font-size: 2.5rem;
  font-family: 'Yellowtail', cursive;
  letter-spacing: 0;
  width: auto;
  min-width: 75rem;
  height: 30rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWineImage = styled.img`
  height: 14rem;
  max-width: 11rem;
  margin: 2rem;
  padding-right: 1rem;
  border-right: 1px solid #adaaa8;
`;

const ReviewInput = styled.textarea`
  width: 100%;
  height: 10rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  transition: border-color 0.3s ease-in-out;
  overflow: scroll;
`;

const WineNameBox = styled.div`
  height: 14rem;
  margin: 2rem 0;
  margin-right: -2rem;
  margin-left: 1rem;
  font-size: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 35rem;
`;

const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 5rem;
  background-color: #fa9f45;
  border-radius: 2rem;
  align-self: center;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    transform: translateY(0.2rem);
  }
  span {
    font-family: 'Oswald', sans-serif;
    color: #00434d;
    font-size: 4rem;
    font-weight: 500;
    text-align: center;
    transform: translateY(-0.65rem);
  }
`;

function Cellar() {
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const [myWines, setMyWines] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [reviewText, setReviewText] = useState({});
  const [userRating, setUserRating] = useState('');

  const location = useLocation();
  const isCellarPageActive = location.pathname === '/cellar';

  const [saveReview] = useMutation(SAVE_REVIEW);

  const {
    loading: cellarLoading,
    data: cellarData,
    refetch: cellarRefetch,
  } = useQuery(GET_CELLAR_BY_USER_ID, {
    variables: { userId },
  });

  const {
    loading: reviewsLoading,
    data: userReviewsData,
    refetch: reviewsRefetch,
  } = useQuery(GET_USER_REVIEWS, {
    variables: { userId },
  });

  useEffect(() => {
    if (isCellarPageActive) {
      cellarRefetch();
      reviewsRefetch();
    }
  }, [isCellarPageActive, cellarRefetch, reviewsRefetch, myReviews]);

  useEffect(() => {
    if (!reviewsLoading && userReviewsData) {
      const reviewsForWines = [...userReviewsData.reviews];
      setMyReviews(reviewsForWines);
    }
  }, [reviewsLoading, userReviewsData, userRating]);

  useEffect(() => {
    if (!cellarLoading && cellarData) {
      const winesInCellar = [...cellarData.cellar.wines];
      setMyWines(winesInCellar);
    }
  }, [cellarLoading, cellarData]);

  async function handleSaveReview(wineId, userId, rating) {
    const wineReviewText = reviewText[wineId];

    const res = await saveReview({
      variables: {
        wineId,
        userId,
        rating: rating,
        experience: wineReviewText,
      },
    });

    const updatedReview = res.data.saveReview;
    const updatedMyReviews = myReviews.map((review) =>
      review.wine._id === updatedReview.wine._id ? updatedReview : review
    );

    setMyReviews(updatedMyReviews);

    setReviewText((prevReviewText) => ({
      ...prevReviewText,
      [wineId]: '',
    }));
    setUserRating('');
  }

  return (
    <StyledCellar>
      <div
        style={{
          borderBottom: '1px solid #BDAFA0',
          borderTop: '1px solid #BDAFA0',
          width: '100%',
          height: '80.5%',
          transform: 'translateY(4%)',
          position: 'fixed',
        }}
      ></div>
      <div
        style={{
          borderLeft: '1px solid #BDAFA0',
          width: '92%',
          height: '100%',
          transform: 'translateX(2%)',
          position: 'absolute',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          height: '100%',
          transform: 'translateY(-5%) translateX(-1.5%)',
        }}
      >
        <div
          style={{
            minWidth: '53.5rem',
            position: 'absolute',
            left: '-5rem',
            bottom: '30rem',
          }}
        >
          <Header>
            My C<span>e</span>llar
          </Header>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '15rem',
            left: '38.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateRows: '1fr 1fr',
              gridTemplateColumns: '1fr',
              gap: '5rem',
            }}
          >
            <ProfileCard
              style={{
                gridRow: '1 / 3',
                fontSize: '5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src="../images/wineProfile.png"
                alt="profilePic"
                style={{ width: '20rem', height: '20rem', borderRadius: '20%' }}
              />
              <div
                style={{
                  marginBottom: '2rem',
                  fontSize: '5rem',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: '500',
                }}
              >
                {Auth.getProfile().data.email}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: '2rem',
                  paddingBottom: '2.5rem',
                  fontSize: '4rem',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: '400',
                  borderBottom: '1px solid #adaaa8',
                }}
              >
                <div>total wines: {myWines.length}</div>
                <div>reviews: {myReviews.length}</div>
                <div>
                  avg rating:&nbsp;
                  {myReviews.length &&
                    (
                      myReviews.reduce(
                        (acc, cur) => acc + Number(cur.rating),
                        0
                      ) / myReviews.length
                    ).toFixed(2)}
                </div>
                <div>
                  most enjoyed:&nbsp;
                  {myWines &&
                    myWines.length > 1 &&
                    myWines
                      .reduce((acc, cur) => {
                        const color = cur.color.toLowerCase();
                        const existingColor = acc.find(
                          (item) => item.color === color
                        );

                        if (existingColor) {
                          existingColor.count++;
                        } else {
                          acc.push({ color, count: 1 });
                        }
                        return acc;
                      }, [])
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 1)[0].color}
                </div>
              </div>
              <div
                style={{
                  paddingTop: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridTemplateRows: 'auto',
                  gap: '1rem',
                  fontSize: '3rem',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: '400',
                }}
              >
                <div
                  style={{
                    gridColumn: '1/4',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    paddingBottom: '0.5rem',
                  }}
                >
                  wines in cellar
                </div>
                <div>
                  red:&nbsp;
                  {
                    myWines.filter(
                      (wine) => wine?.color?.toLowerCase() === 'red'
                    ).length
                  }
                </div>
                <div>
                  white:&nbsp;
                  {
                    myWines.filter(
                      (wine) => wine?.color?.toLowerCase() === 'white'
                    ).length
                  }
                </div>
                <div>
                  fortified:&nbsp;
                  {
                    myWines.filter(
                      (wine) => wine?.color?.toLowerCase() === 'fortified'
                    ).length
                  }
                </div>
                <div>
                  rose:&nbsp;
                  {
                    myWines.filter(
                      (wine) => wine?.color?.toLowerCase() === 'rose'
                    ).length
                  }
                </div>
                <div>
                  sparkle:&nbsp;
                  {
                    myWines.filter(
                      (wine) => wine?.color?.toLowerCase() === 'sparkling'
                    ).length
                  }
                </div>
                <div>
                  rice:&nbsp;
                  {
                    myWines.filter(
                      (wine) => wine?.color?.toLowerCase() === 'rice'
                    ).length
                  }
                </div>
                <div>
                  mixed:&nbsp;
                  {
                    myWines.filter(
                      (wine) => wine?.color?.toLowerCase() === 'mixed'
                    ).length
                  }
                </div>
              </div>
            </ProfileCard>
            {myWines &&
              myWines.map((wine) => (
                <StyledWineCard key={wine._id}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      <StyledWineImage src={wine.pictureUrl} />
                      <WineNameBox>
                        <div>
                          {`${
                            wine.name
                              .slice(0, 25)
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                              )
                              .join(' ') + '..'
                          } `}
                        </div>
                        <div>{wine.color.toLowerCase()}</div>
                        <div>{`type: ${
                          wine.country.toLowerCase().slice(0, 20) + '..'
                        }`}</div>
                      </WineNameBox>
                      <div>
                        {reviewText[wine._id] ? (
                          <div style={{ marginRight: '3rem' }}>
                            <StarRating
                              onSetRating={setUserRating}
                              defaultRating={Number(
                                myReviews
                                  ?.filter(
                                    (review) =>
                                      wine._id.toString() ===
                                      review.wine._id.toString()
                                  )
                                  ?.at(0)?.rating
                              )}
                            />
                            <ReviewInput
                              type="text"
                              value={reviewText[wine._id] || ''}
                              onChange={(e) => {
                                const newText = e.target.value;
                                setReviewText((prevTexts) => ({
                                  ...prevTexts,
                                  [wine._id]: newText,
                                }));
                              }}
                            />
                          </div>
                        ) : (
                          <div style={{ marginRight: '3rem' }}>
                            <StarRating
                              onSetRating={setUserRating}
                              defaultRating={Number(
                                myReviews
                                  ?.filter(
                                    (review) =>
                                      wine._id.toString() ===
                                      review.wine._id.toString()
                                  )
                                  ?.at(0)?.rating
                              )}
                            />
                            <ReviewInput
                              placeholder={
                                myReviews
                                  ?.filter(
                                    (review) =>
                                      wine._id.toString() ===
                                      review.wine._id.toString()
                                  )
                                  ?.at(0)?.experience
                              }
                              value={reviewText[wine._id]}
                              onChange={(e) => {
                                const newText = e.target.value;
                                setReviewText((prevTexts) => ({
                                  ...prevTexts,
                                  [wine._id]: newText,
                                }));
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <SaveButton
                      onClick={() =>
                        handleSaveReview(wine._id, userId, Number(userRating))
                      }
                    >
                      <span>save</span>
                    </SaveButton>
                  </div>
                </StyledWineCard>
              ))}
          </div>
        </div>
      </div>
    </StyledCellar>
  );
}

export default Cellar;
