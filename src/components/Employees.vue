<template>
  <main class="employee-management">
    <h1 class="page-title">Працівники</h1>
    <div class="filter-section">
      <span class="filter-label">Фільтр</span>
      <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/4b09284ab367fa70a05a4a4f59e91721443ad7e8e783dfd2c26fb681ebacd30f?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Filter icon" class="filter-icon" />
    </div>
    <div class="action-section">
      <form class="search-form" @submit.prevent="handleSearch">
        <input type="text" v-model="searchQuery" class="search-input" placeholder="Пошук" />
          <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/d5c4873b11c69bccf0067abe1ce038edad573eb5f56d874777e45978e309d1df?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="search-icon" />
      </form>
      <button class="add-button" @click="handleAddEmployee">
        <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/580b8f10bc1ad9769a3aed213267f4211a64a8cc50c1c93efc50ca7ae69c8da2?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="add-icon" />
        <span>Додати</span>
      </button>
    </div>
    <section class="employee-list">
      <header class="list-header">
        <div class="header-group">
          <span class="header-item">ID</span>
          <span class="header-item">Ім'я/Email</span>
        </div>
        <div class="header-group">
          <span class="header-item">Роль</span>
          <span class="header-item">Телефон</span>
          <span class="header-item">Додано</span>
          <span class="header-item">Керування</span>
        </div>
      </header>
      <ul class="employee-items">
        <li v-for="employee in filteredEmployees" :key="employee.id" class="employee-item">
          <div class="employee-info">
            <div class="employee-primary">
              <span class="employee-id">{{ employee.id }}.</span>
              <div class="employee-name-email">
                <img :src="employee.avatar" :alt="`${employee.name}'s avatar`" class="employee-avatar" />
                <div>
                  <h2 class="employee-name">{{ employee.name }}</h2>
                  <p class="employee-email">{{ employee.email }}</p>
                </div>
              </div>
            </div>
            <div class="employee-secondary">
              <span class="employee-role">{{ employee.role }}</span>
              <span class="employee-phone">{{ employee.phone }}</span>
              <span class="employee-added">{{ employee.added }}</span>
            </div>
          </div>
          <div class="employee-actions">
            <button class="action-button delete-button" @click="handleDelete(employee.id)">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/ba078f16c37c9f7f4a38bffc3903a0783959b7a0f9fc95368926f1c2df1ef2a7?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="action-icon" />
              <span>Видалити</span>
            </button>
            <button class="action-button update-button" @click="handleUpdate(employee.id)">
              <img :src="employee.updateIcon" alt="" class="action-icon" />
              <span>Оновити</span>
            </button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: 'EmployeeList', // Назва компонента
  data() {
    return {
      searchQuery: '', // Рядок пошуку для фільтрації працівників
      employees: [ // Масив працівників із даними про кожного
        {
          id: 1,
          name: 'Степан Мельник',
          email: 'stepan@gmail.com',
          avatar: 'https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/c34a4bd6222bfecc7743319828be8f814b33d637b62a0789e4b5af3ab8a516a5?apiKey=c3e46d0a629546c7a48302a5db3297d5&',
          role: 'superadmin',
          phone: '+380981234567',
          added: '01.01.2024',
          updateIcon: 'https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/f5bb7e03e7811141f22580f13ea4b5cc63d44ccc5748ef70599f3d2c1a8e772c?apiKey=c3e46d0a629546c7a48302a5db3297d5&'
        },
        // Інші працівники...
      ]
    };
  },
  computed: {
    filteredEmployees() {
      // Повертає відфільтрований список працівників відповідно до рядка пошуку
      return this.employees.filter(employee => {
        const searchTerm = this.searchQuery.toLowerCase();
        return (
          employee.name.toLowerCase().includes(searchTerm) ||
          employee.email.toLowerCase().includes(searchTerm)
        );
      });
    }
  },
  methods: {
    handleSearch() {
      // Додатковий метод для обробки пошуку. Може використовуватись для додаткових дій.
    },
    handleAddEmployee() {
      // Додає нового працівника до списку
      const newEmployee = {
        id: this.employees.length + 1, // Генеруємо унікальний id
        name: 'Новий Працівник',
        email: 'new_employee@gmail.com',
        avatar: 'https://via.placeholder.com/150', // Плейсхолдер для аватара
        role: 'manager',
        phone: '+380000000000',
        added: new Date().toISOString().split('T')[0], // Дата додавання у форматі 'YYYY-MM-DD'
        updateIcon: 'https://via.placeholder.com/20' // Плейсхолдер для іконки оновлення
      };
      this.employees.push(newEmployee); // Додаємо нового працівника в список
    },
    handleDelete(id) {
      // Видаляє працівника за id
      this.employees = this.employees.filter(employee => employee.id !== id);
      alert(`Працівника з id ${id} видалено!`);
    },
    handleUpdate(id) {
      // Оновлює дані працівника за id
      const employeeIndex = this.employees.findIndex(employee => employee.id === id);
      if (employeeIndex !== -1) {
        // Змінюємо дані працівника (наприклад, роль)
        this.employees[employeeIndex].role = 'updated role';
        alert(`Працівника з id ${id} оновлено!`);
      } else {
        alert(`Працівника з id ${id} не знайдено!`);
      }
    }
  }
};
</script>


  
  <style scoped>
.employee-management {
  transform: scale(0.9); 
  transform-origin: top left; 
  width: 1200px; 
  margin-left: 20px;
}
  
  .page-title {
    color: #000;
    font-size: 40px;
    font-weight: 700;
  }
  
  .filter-section {
    display: flex;
    margin-top: 32px;
    gap: 9px;
    font-size: 30px;
    color: #000;
    font-weight: 400;
    white-space: nowrap;
    line-height: 1;
  }
  
  .filter-label {
    margin-left: 0px;

  }
  
  .filter-icon {
    aspect-ratio: 0.95;
    object-fit: contain;
    object-position: center;
    width: 37px;
  }
  
  .action-section {
    display: flex;
    margin-top: 22px;
    gap: 40px 45px;
    font-weight: 400;
    flex-wrap: wrap;
  }
  
   
.search-form {
  display: flex;
  align-items: center;
  background-color: #F1E9E9;
  border-radius: 8px;
  padding: 8px 20px;
  border: 1px solid transparent;
  width: 400px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: Montserrat, sans-serif;
  font-size: 17px;
  color: #000;
  outline: none;
}

.search-icon {
  width: 30px; 
  height: 30px;
  margin-left: 8px;
}
  
  .add-button {
    border-radius: 12px;
    background-color: #c4aeac;
    display: flex;
    gap: 21px;
    font-size: 16px;
    color: #000;
    white-space: nowrap;
    line-height: 1;
    padding: 8px 15px;
    align-items: center;
    border: none;
    cursor: pointer;
  }
  
  .add-icon {
    aspect-ratio: 0.83;
    object-fit: contain;
    object-position: center;
    width: 24px;
  }
  
  .employee-list {
    margin-top: 22px;
  }
  
  .list-header {
    border-radius: 24px;
    background-color: #fff7f6;
    display: flex;
    width: 100%;
    align-items: center;
    gap: 40px 280px;
    font-size: 20px;
    color: #000;
    font-weight: 400;
    white-space: nowrap;
    line-height: 1;
    justify-content: start;
    flex-wrap: wrap;
    padding: 26px 35px;
    border: 2px solid #e6e6e6;
  }
  
  .header-group {
    display: flex;
    align-items: center;
    gap: 40px;
  }
  
  .header-item {
    margin: auto 0;
  }
  
  .employee-items {
    list-style-type: none;
    padding: 0;
  }
  
  .employee-item {
    border-radius: 24px;
    background-color: #fff7f6;
    display: flex;
    width: 100%;
    align-items: center;
    gap: 40px 116px;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 27px 28px;
    border: 2px solid #e6e6e6;
    margin-top: 20px;
  }
  
  .employee-info {
    display: flex;
    flex-wrap: wrap;
    gap: 40px 78px;
  }
  
  .employee-primary {
    display: flex;
    align-items: center;
    gap: 44px;
  }
  
  .employee-id {
    color: #000;
    font-feature-settings: "liga" off, "clig" off;
    text-shadow: 0px 4px 4px rgba(99, 2, 2, 0.22);
    font-size: 50px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -2.5px;
  }
  
  .employee-name-email {
    display: flex;
    gap: 6px;
  }
  
  .employee-avatar {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 80px;
    border-radius: 100px;
  }
  
  .employee-name {
    color: #000;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
  
  .employee-email {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
    margin: 18px 0 0;
  }
  
  .employee-secondary {
    display: flex;
    align-items: center;
    gap: 64px;
    font-size: 20px;
    color: #000;
    font-weight: 400;
    white-space: nowrap;
    line-height: 1;
  }
  
  .employee-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .action-button {
    border-radius: 12px;
    background-color: #c4aeac;
    display: flex;
    gap: 8px;
    font-size: 16px;
    color: #000;
    font-weight: 400;
    white-space: nowrap;
    line-height: 1;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    align-items: center;
  }
  
  .action-icon {
    aspect-ratio: 0.83;
    object-fit: contain;
    object-position: center;
    width: 24px;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  @media (max-width: 991px) {
    .employee-id {
      font-size: 40px;
    }
  
    .list-header,
    .employee-item {
      padding: 20px;
    }
  
    .employee-secondary,
    .employee-actions {
      width: 100%;
      justify-content: space-between;
    }
  }
  </style>