
const categoryLink = "https://localhost:7130/bookstore/categories";
const bookLink = "https://localhost:7130/bookstore/books";
const QuestionsLink = "https://localhost:7130/bookstore/Questions";
const GrantsLink = "https://localhost:7130/bookstore/bookgrants";
const libraryLink = "https://localhost:7130/bookstore/KnowledgeHubs";
const questionData ="https://localhost:7130/bookstore/UserQuestionsAnswers";

export default{

  //...................... category
  async Allcategory(context ){
    const response = await fetch(categoryLink);
      const responseData = await response.json();
    
      if (!response.ok) {
        const error = new Error(responseData.message || 'failed to get category');
  
        throw error;
      }
      const categories =[];
       responseData.forEach(element => {
        categories.push(element);       
       });

        context.commit("setCategories",categories);
    },
    async AddCat(_,paylaod ){
      const response = await fetch(categoryLink,
      {
        method:'POST',
      
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(paylaod)
      },);

      if (!response.ok) {
        const error = 'failed to send data';
        throw error;
      }
    },
    //...................... book

    
  async AllBooks(context ){
    const response = await fetch(bookLink);
      const responseData = await response.json();
    
      if (!response.ok) {
        const error = new Error(responseData.message || 'failed to get books');
  
        throw error;
      }
      const books =[];
       responseData.forEach(element => {
        books.push(element);       
       });

        context.commit("setBooks",books);
    },
      async AddBook(_,paylaod ){
        const response = await fetch(bookLink,
        {
          method:'POST',
        
        
          body:paylaod
        },);

      
        if (!response.ok) {
          const error = 'failed to send data';
          throw error;
        }
      },

      // .................................. questions
      async getBookQuestions(context ){
        const response = await fetch(QuestionsLink);
          const responseData = await response.json();
        
          if (!response.ok) {
            const error = new Error(responseData.message || 'failed to get quesiots');
      
            throw error;
          }
          const questions =[];
           responseData.forEach(element => {
            questions.push(element);       
           });
    
            context.commit("setquestions",questions);
        },

          async AddQuestion(_,paylaod ){
            const response = await fetch(QuestionsLink,
            {
              method:'POST',
            
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(paylaod)
            },);
    
          
            if (!response.ok) {
              const error = 'failed to send data';
              throw error;
            }
          },
      // .................................. grants

      async GetLibraries(context ){
        const response = await fetch(libraryLink);
          const responseData = await response.json();
        
          if (!response.ok) {
            const error = new Error(responseData.message || 'failed to get libraries ');
      
            throw error;
          }
          const libraries =[];
           responseData.forEach(element => {
            libraries.push(element);       
           });
    
            context.commit("setlibraries",libraries);
        },

          async AddLibrary(_,paylaod ){
            const response = await fetch(libraryLink,
            {
              method:'POST',
            
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(paylaod)
            },);
    
          
            if (!response.ok) {
              const error = 'failed to send data';
              throw error;
            }
          },
      // .................................. grants

      async GetGrants(context ){
        const response = await fetch(GrantsLink);
          const responseData = await response.json();
        
          if (!response.ok) {
            const error = new Error(responseData.message || 'failed to get grants');
      
            throw error;
          }
          const grants =[];
           responseData.forEach(element => {
            grants.push(element);       
           });
    
            context.commit("setGrants",grants);
        },

          async AddGrant(_,paylaod ){
            const response = await fetch(GrantsLink,
            {
              method:'POST',
            
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(paylaod)
            },);
    
          
            if (!response.ok) {
              const error = 'failed to send data';
              throw error;
            }
          },
          //..... update quesiotn
          async AddQuestionData (_,paylaod ){
            const response = await fetch(questionData,
            {
              method:'POST',
            
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(paylaod)
            },);
    
          
            if (!response.ok) {
              const error = 'failed to send data';
              throw error;
            }
          }
}