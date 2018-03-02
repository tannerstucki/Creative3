var app = new Vue({
  el: '#app',
    data: {
    number: '',
    current: {},
    loading: true,
  },
  data: {
    number: '',
    max: '',
    current: {},
    loading: true,
    addedName: '',
    addedComment: '',
    comments: {},
    el: document.body,
    posts: [],
    errors: [],
    firstTime: false,
    likes: 0,
    dislikes: 0,
    totalLikes: {},
    totalDislikes: {},
  },
  created: function() {
    this.xkcd();
  },
    watch: {
    number: function(value,oldvalue) {
      if (oldvalue === '') {
	this.max = value;
      } else {
	//this.xkcd();
      }
    },
  },
  computed: {
      getImages: function() {
          var images = new Array;
          images[0] = "img/flowers.jpg";
          images[1] = "img/river.jpg";
      }
  },
  methods: {
    xkcd: function() {
    axios.get('https://talaikis.com/api/quotes/' + this.number).then(response => {
    this.posts = response.data;
    this.number = 1;
    console.log(this.number);
    this.current = this.posts[this.number];
    this.loading = false;
    console.log(this.current.author);
    return this.current;
      }).catch(err => {
          this.number = this.max
      });
    },
      previousComic: function() {
    if (this.number === 0){
        this.number = 99;
        this.current = this.posts[this.number];
    }
    else{
      this.number = this.number - 1;
      //console.log(this.number);
      this.current = this.posts[this.number];
      //console.log(this.current.author);
    }
    },
          firstComic: function() {
      this.number = 1;
    },
            lastComic: function() {
      this.number = this.max;
    },
    nextComic: function() {
      if (this.number === 99){
        this.number = 0;
        this.current = this.posts[this.number];
        newImage();
      }
      else{
        this.number = this.number + 1;
        this.current = this.posts[this.number];
      }
    },
    newImage: function(){
        j++;
        this.currentImage = images[j];
    },
       getRandom: function(min, max) {
      min = Math.ceil(0);
      max = Math.floor(99);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },
    randomComic: function() {
      this.number = this.getRandom(1, this.max);
      this.current = this.posts[this.number];
    },
    addComment: function() {
      if (!(this.number in this.comments))
	Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({author:this.addedName,text:this.addedComment, when:this.timer});
      this.addedName = '';
      this.addedComment = '';
    },
    moment: function(){
      return moment();
    },
    imgClick: function myFunction() {
        if (!(this.number in this.totalLikes)){
          Vue.set(app.totalLikes, this.number, new Array)
          this.likes = 0; 
        }
        this.likes++;
        if (this.number in this.totalLikes){
            this.totalLikes[this.number].pop();
        }
        this.totalLikes[this.number].push(this.likes);
    },
    imgClick2: function myFunction(){
        if (!(this.number in this.totalDislikes)){
          Vue.set(app.totalDislikes, this.number, new Array)
          this.dislikes = 0; 
        }
        this.dislikes++;
        if (this.number in this.totalDislikes){
            this.totalDislikes[this.number].pop();
        }
        this.totalDislikes[this.number].push(this.dislikes);
    },
  }
});