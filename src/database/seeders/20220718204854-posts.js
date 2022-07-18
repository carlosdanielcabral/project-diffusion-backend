module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts', [{
      author: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus ullamcorper velit, vitae ultrices orci pellentesque auctor. Integer condimentum consectetur scelerisque. Donec aliquam dui vitae mauris scelerisque, nec posuere ex efficitur. Aliquam sodales eget elit ac dapibus. Curabitur imperdiet velit nec sem pretium euismod. Ut eget dolor in purus venenatis eleifend blandit vel orci. Vivamus cursus ultrices turpis eu gravida. Vestibulum efficitur purus sed lacinia dapibus. Donec dui dui, interdum nec sem id, tincidunt fringilla risus. Morbi condimentum augue et lorem sodales, eget hendrerit neque pulvinar. Aenean fermentum ante ligula. Maecenas at egestas ligula. Nam vulputate consectetur suscipit. Sed auctor mattis elit, eu tincidunt erat laoreet eget. In tempus at tortor viverra ultricies. Vivamus sit amet posuere purus.
  
      Maecenas posuere ut mi in luctus. In sollicitudin dictum enim at rhoncus. Donec elementum metus id dolor porttitor, nec pharetra dolor fermentum. Aenean nisl lacus, dapibus non augue a, gravida interdum nisi. Vivamus interdum, ex sed pharetra elementum, mauris nulla rutrum mauris, semper hendrerit lectus leo ac eros. Suspendisse eu augue varius, mollis justo eget, condimentum orci. Duis metus mi, cursus nec lacus a, egestas tempor ex. Nulla tellus ante, semper placerat iaculis eu, molestie posuere libero. Nam eu nunc ut orci facilisis imperdiet. Etiam urna quam, vestibulum ac iaculis a, fermentum eu justo. Nulla nunc urna, placerat id egestas vitae, molestie sit amet diam.`
    }, {
      author: 2,
      title: 'Donec magna ante, pharetra ut lorem nec, consequat vulputate urna',
      content: `Donec magna ante, pharetra ut lorem nec, consequat vulputate urna. Nam posuere, elit id pellentesque gravida, massa augue sodales magna, ut tincidunt augue felis vitae felis. Praesent at libero venenatis erat ornare tempus. Quisque risus leo, commodo nec porta id, rutrum ac mauris. Suspendisse efficitur ut libero vel congue. Pellentesque id purus eu lorem consectetur vestibulum. Aenean varius venenatis sodales. Phasellus venenatis est vitae molestie tempus. Maecenas ut accumsan quam, eget tempor elit. Ut commodo finibus libero, sed auctor quam venenatis in. Praesent nec diam fermentum, vulputate velit a, tincidunt mi. Mauris congue condimentum felis nec eleifend.

      Aliquam sit amet dapibus arcu. Cras efficitur ligula nec massa cursus, nec laoreet lorem hendrerit. Nunc scelerisque augue sit amet nulla hendrerit, sed varius turpis aliquam. Praesent eget feugiat ante. Aliquam venenatis enim nec consectetur ultricies. Aenean laoreet urna risus, ut cursus risus fermentum non. Etiam eu nulla rutrum, dignissim orci vehicula, tincidunt velit. Fusce feugiat, dolor a mattis dictum, mi mi finibus libero, eu congue orci lorem a elit. Donec et velit dictum, ultricies neque eu, gravida velit. Duis semper feugiat metus, vel pharetra neque pulvinar vel.`
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
