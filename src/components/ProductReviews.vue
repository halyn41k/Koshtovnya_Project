<template>
  <section class="reviews-section">
    <h2 class="specifications-title">Відгуки</h2>

    <!-- Якщо відгуки є -->
    <ul v-if="reviews.length > 0" class="reviews-list">
      <li v-for="review in reviews" :key="`${review.id}-${Math.random()}`" class="review-item">
        <div class="review-header">
          <!-- Ліва частина -->
          <div class="review-user">
            <h4 class="review-author">{{ review.user_first_name }} {{ review.user_last_name }}</h4>
          </div>
          <!-- Права частина -->
          <div class="review-details">
            <div class="review-rating">
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ filled: star <= review.rating }"
              >
                &#9733;
              </span>
            </div>
            <p class="review-date">{{ formatReviewDate(review.date) }}</p>
          </div>
        </div>
        <!-- Коментар -->
        <p class="review-comment">{{ review.comment }}</p>
        <!-- Кнопка "Відповісти" -->
        <button class="reply-button" @click="replyToReview(review.id)">Відповісти</button>
      </li>
    </ul>

    <!-- Якщо відгуків немає -->
    <p v-else class="no-reviews">Немає відгуків для цього товару.</p>

    <!-- Форма для додавання відгуку -->
    <button class="review-button" @click="toggleReviewForm">Додати відгук</button>
    <div v-if="showReviewForm" class="review-form">
      <h3>Напишіть відгук</h3>
      <textarea v-model="newReview.comment" placeholder="Ваш коментар" required></textarea>
      <div class="rating-selector">
        <label for="rating">Рейтинг:</label>
        <select v-model="newReview.rating">
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <button @click="submitReview" class="review-submit">Відправити</button>
    </div>
  </section>
</template>


<script>
export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      showReviewForm: false,
      newReview: {
        comment: "",
        rating: 5,
      },
    };
  },
  methods: {
    formatReviewDate(date) {
      return date;
    },
    toggleReviewForm() {
      this.showReviewForm = !this.showReviewForm;
    },
    submitReview() {
      if (this.newReview.comment.trim() === "") {
        alert("Будь ласка, введіть коментар.");
        return;
      }

      const newReviewData = {
        id: Date.now(),
        product_id: this.productId,
        comment: this.newReview.comment,
        rating: this.newReview.rating,
        user_first_name: "Тест",
        user_last_name: "Користувач",
        date: new Date().toLocaleString(),
      };

      this.reviews.push(newReviewData);
      this.newReview.comment = "";
      this.showReviewForm = false;
    },
  },
  created() {
    fetch(`http://26.235.139.202:8080/api/products/${this.productId}/reviews`)
  .then((response) => {
    console.log("Response:", response);
    if (!response.ok) {
      throw new Error("Помилка завантаження відгуків");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Відгуки з API:", data);
    this.reviews = data?.data ?? [];
  })
  .catch((error) => {
    console.error("Помилка при завантаженні відгуків:", error.message);
    this.reviews = [];
  });

    },
};
</script>

<style scoped>
.specifications-title {
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-align: center;
  color: #171717;
  margin: 20px 0;
}
  
  .specifications-title::before,
  .specifications-title::after {
    content: "";
    position: absolute;
    top: 1200px;
    width: 45%;
    height: 2px;
    background: grey;
  }
  
  .specifications-title::before{
    left: 0;
  }
  
  .specifications-title::after{
    right: 0;
  }

.reviews-list {
  list-style: none;
  padding: 0;
}

.review-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 950px;
  margin-left: 50px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.review-user {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #333;
}

.review-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.review-rating {
  display: flex;
  gap: 3px;
}

.review-date {
  font-size: 14px;
  color: #777;
}

.review-comment {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  color: #555;
  margin: 10px 0;
}

.reply-button {
  align-self: flex-start;
  background: transparent;
  border: none;
  color: #6B1F1F;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
}

.reply-button:hover {
  text-decoration: underline;
}


.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.review-author {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.review-rating .star {
  font-size: 20px;
  color: #ccc;
}

.review-rating .star.filled {
  color: #ffcc00;
}

.review-comment {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: #555;
  margin: 10px 0;
  
}

.review-date {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #999;
}

.no-reviews {
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  color: #666;
  margin: 20px 0;
}

.review-button {
  padding: 12px 17px;
  width: 170px;
  color: #FFF;
  background: #6B1F1F;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-family: 'Merriweather', sans-serif;
  cursor: pointer;
  margin-left: 1250px;
}

.review-button:hover,
.review-submit:hover {
  background: #FF4C4C;
}

.review-form {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.review-form textarea {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  resize: vertical;
}
</style>
