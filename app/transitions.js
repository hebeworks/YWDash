// app/transitions.js

export default function(){  
  this.transition(
//    this.fromRoute('tut1'),
    this.toRoute('statnotices'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
}