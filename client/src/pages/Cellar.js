import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CELLAR_BY_USER_ID, GET_USER_REVIEWS } from '../utils/queries';
import Auth from '../utils/auth';
import StarRating from '../ui/StarRating';
import { SAVE_REVIEW } from '../utils/mutations';

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
  transform: rotate(270deg);
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
  height: 20rem;
  width: 75rem;
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
  width: 75rem;
  min-width: 75rem;
  height: 20rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWineImage = styled.img`
  height: 14rem;
`;

const ReviewInput = styled.textarea`
  width: 20rem;
  height: 10rem;
`;

function Cellar() {
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const [myWines, setMyWines] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [reviewText, setReviewText] = useState({});

  const [saveReview] = useMutation(SAVE_REVIEW);

  const { loading, error, data, refetch } = useQuery(GET_CELLAR_BY_USER_ID, {
    variables: { userId },
  });

  const {
    loading: reviewsLoading,
    error: reviewsError,
    data: userReviews,
    refetch: reviewsRefetch,
  } = useQuery(GET_USER_REVIEWS, {
    variables: { userId },
  });

  refetch();

  useEffect(() => {
    if (!loading && data?.cellar?.wines?.length !== myWines.length) {
      const winesInCellar = data.cellar.wines.map((wine) => wine);
      setMyWines(winesInCellar);
    }
  }, [loading, data]);

  useEffect(() => {
    if (!reviewsLoading && userReviews) {
      const reviewsForWines = userReviews.reviews.slice();
      setMyReviews(reviewsForWines);
    }
  }, [reviewsLoading, userReviews]);

  async function handleSaveReview(wineId, userId, rating) {
    const wineReviewText = reviewText[wineId];
    const res = await saveReview({
      variables: {
        wineId: wineId,
        userId: userId,
        rating: rating,
        experience: wineReviewText,
      },
    });
    await reviewsRefetch();
    const reviewsForWines = userReviews.reviews.slice();
    setMyReviews(reviewsForWines);
  }

  return (
    <StyledCellar>
      <div
        style={{
          borderBottom: '1px solid #BDAFA0',
          borderTop: '1px solid #BDAFA0',
          width: '100%',
          height: '79.5%',
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
        <div style={{ minWidth: '53.5rem' }}>
          <Header>
            My C<span>e</span>llar
          </Header>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateX(-2.15%)',
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
            <ProfileCard></ProfileCard>
            {myWines &&
              myWines.map((wine) => (
                <StyledWineCard key={wine._id}>
                  <StyledWineImage src={wine.pictureUrl} />
                  {wine.name}
                  {reviewText[wine._id] ? (
                    <ReviewInput
                      value={reviewText[wine._id] || ''}
                      onChange={(e) => {
                        const newText = e.target.value;
                        setReviewText((prevTexts) => ({
                          ...prevTexts,
                          [wine._id]: newText,
                        }));
                      }}
                    />
                  ) : (
                    <ReviewInput
                      placeholder={
                        myReviews
                          ?.filter(
                            (review) =>
                              wine._id.toString() === review.wine._id.toString()
                          )
                          ?.at(0)?.experience
                      }
                      value={reviewText[wine._id] || ''}
                      onChange={(e) => {
                        const newText = e.target.value;
                        setReviewText((prevTexts) => ({
                          ...prevTexts,
                          [wine._id]: newText,
                        }));
                      }}
                    />
                  )}
                  <StarRating />
                  <button onClick={() => handleSaveReview(wine._id, userId, 5)}>
                    Submit
                  </button>
                </StyledWineCard>
              ))}
          </div>
        </div>
      </div>
    </StyledCellar>
  );
}

export default Cellar;
