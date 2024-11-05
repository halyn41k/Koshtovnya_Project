<template>
    <main class="profit-report">
      <!-- Header Section -->
      <header class="report-header">
        <h1 class="report-title">Звіти</h1>
        <h2 class="report-subtitle">Звіт по прибутку</h2>
      </header>
  
      <!-- Controls Section -->
      <section class="report-controls">
        <div class="date-range-picker">
          <label for="start-date" class="date-label">Період:</label>
          <div class="date-input">
            <input type="date" id="start-date" class="date-field" aria-label="Start date" />
          </div>
          <span class="date-separator">до</span>
          <div class="date-input">
            <input type="date" id="end-date" class="date-field" aria-label="End date" />
          </div>
        </div>
        <button class="filter-button">
          <span class="filter-text">Фільтр</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/4b09284ab367fa70a05a4a4f59e91721443ad7e8e783dfd2c26fb681ebacd30f?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Filter icon" class="filter-icon" />
        </button>
      </section>
  
      <!-- Report Content Section -->
      <section class="report-content">
        <div class="report-table-container">
          <table class="profit-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Номер Транзакції</th>
                <th>Джерело прибутку</th>
                <th>Сума прибутку</th>
                <th>Витрати</th>
                <th>Чистий прибуток</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in tableData" :key="index">
                <td>{{ row.date }}</td>
                <td>{{ row.transactionNumber }}</td>
                <td>{{ row.source }}</td>
                <td>{{ row.income }}</td>
                <td>{{ row.expenses }}</td>
                <td>{{ row.netProfit }}</td>
              </tr>
            </tbody>
          </table>
          <div class="report-summary">
            <p class="summary-item">Загальний Прибуток: 15,000 грн</p>
            <p class="summary-item">Загальні Витрати: 2,000 грн</p>
            <p class="summary-item">Чистий Прибуток: 12,000 грн</p>
          </div>
        </div>
        <div class="report-actions">
          <button class="action-button">Друк</button>
          <button class="action-button">Експорт в Excel</button>
          <button class="action-button">Експорт в PDF</button>
        </div>
      </section>
  
      <!-- Additional Reports Section -->
      <section class="additional-reports">
        <section class="materials-report">
          <h3 class="report-title">Матеріали</h3>
          <table class="materials-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип Матеріалу</th>
                <th>Кількість</th>
                <th>Сума (грн)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in materialsData" :key="index">
                <td>{{ item.date }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
        </section>
        
        <section class="operational-expenses-report">
          <h3 class="report-title">Операційні Витрати</h3>
          <table class="expenses-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип Витрати</th>
                <th>Опис</th>
                <th>Сума (грн)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(expense, index) in expensesData" :key="index">
                <td>{{ expense.date }}</td>
                <td>{{ expense.type }}</td>
                <td>{{ expense.description }}</td>
                <td>{{ expense.amount }}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: 'ProfitReportView',
    data() {
      return {
        tableData: [
          { date: '01.11.2023', transactionNumber: 'TRX12345', source: 'Продаж товару', income: '10,000 грн', expenses: '2,000 грн', netProfit: '8,000 грн' }
        ],
        materialsData: [
          { date: '01.11.2023', type: 'Японський бісер', quantity: '100 грам', amount: '3,000 грн' }
        ],
        expensesData: [
          { date: '01.11.2023', type: 'Упаковка', description: 'Коробки та пакети', amount: '500 грн' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .profit-report {
    font-family: Montserrat, sans-serif;
    color: #000;
    font-family: Montserrat, sans-serif;
  transform: scale(0.9); /* Зменшує контент вдвічі */
  transform-origin: top left; /* Задає точку масштабування з лівого верхнього кута */
  font-family: Montserrat, sans-serif;
  width: 1200px; /* Компенсує зменшення, щоб зберегти початковий розмір контейнера */
  margin-left: 20px;
  }
  
  .report-header {
    margin-bottom: 20px;
  }
  
  .report-title {
    font-size: 40px;
    font-weight: 700;
  }
  
  .report-subtitle {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    margin-top: 55px;
  }
  
  .report-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  
  .date-range-picker {
    display: flex;
    align-items: center;
    gap: 17px;
  }
  
  .date-label {
    font-size: 20px;
  }
  
  .date-input {
    background-color: #fff;
    border: 1px solid #767676;
    padding: 2px 3px;
  }
  
  .filter-button {
    display: flex;
    align-items: center;
    gap: 13px;
  }
  
  .report-content {
    display: flex;
    gap: 26px;
    flex-wrap: wrap;
  }
  
  .profit-table {
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-collapse: collapse;
  }
  
  .profit-table th, .profit-table td {
    padding: 18px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .report-summary {
    margin-top: 27px;
    font-size: 24px;
    text-align: right;
  }
  
  .additional-reports {
    margin-top: 64px;
  }
  
  .materials-table, .expenses-table {
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-collapse: collapse;
    font-size: 18px;
  }
  </style>
  