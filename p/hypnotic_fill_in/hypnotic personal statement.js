let MODE = 0;
Name = ["Friend" , "Joe"];
Occupation = ["counselor" , "florist"]; 
Action_A = ["read" , "grow"];
Action_A_2 = ["press the button", "grow"];
Action_A_ing = ["reading" , "growing"];
Object_A = ["essays" , "flowers"];
Object_B = ["CV" , "tomato"]; // odd
Object_B_pl = ["CVs" , "tomatoes"]; // odd
Object_B_add = ["document" , "plant"];
Object_C = ["style" , "seed"]; // seed
Object_D= ["incentive", "rootlet"];
Object_E = ["motifs","cilia"];
Object_F= ["accept button", "pencil"];
Object_G = ["mouse","pad"];
Object_H =["??","stalk"];
Object_I = ["award", "leaf"];
Object_I_pl = ["awards", "leaves"];
Object_J = ["notes", "hairs"];
Object_K = ["finesse","cilia"];
Object_L = ["paper","roots"];

Grew_up = ["habited a house in Marseille" , "grew up on a farm in Wisconsin"];
Mood = ["eagerly", comfortably];
Mood_n = ["eager", comfortable];
Mood2 = ["exciting", "easy"];
Talk_to = ["guide", "talk to"];
Talking = ["explaining", "talking"]; // guiding
Specific_A = ["One listens to the words on a page. One can feel urgency that it will become an artwork that will bring <em>fulfillment</em> by the words it uses.", "One puts a tomato seed in the ground. One can feel <em>hope</em> that it will grow into a tomato plant that <em>will bring satisfaction</em> by the fruit it has."];
Specific_B = ["embellishes the qualities of the pen", "soaks up water"];
Specific_C = ["the pens that <em>bring fortitude and enrichment</em> and the reward of forming", "of the rains that <em>bring peace and comfort</em> and the joy of growing to"];
Specific_D = ["illuminates","swelling"];
Specific_E = ["destroy all walls between the author and the listener as a befriending companion","push up above the ground as a sprouting plant"];
Specific_F = ["the first joyous acceptance on the list","the first little leaflike things on the stalk"];
Specific_G = ["the fine accomplishments","the fine little hairs"];

Specific_H = ["",""];

Specific_I = ["",""];
Difficulty_level = ["a lot of", "not very much"];
Adj_A = ["trifling", "little"];
Adj_B = ["ready", "good"];
Adj_C = ["ready", "comfortable"];
Adv_A = ["quickly","slowly"];


let answr = `${Name[MODE]}, I would like to talk to you. I know that you are a ${Occupation[MODE]}, that you ${Action_A[MODE]} ${Object_A[MODE]}, and I ${Grew_up[MODE]} and I liked ${Action_A_ing[MODE]} ${Object_A[MODE]}. I still do. So I would like to have you take a seat in your ${Mood2[MODE]} chair as I ${Talk_to[MODE]} you. I am going to say a lot of things to you but it won’t be about ${Object_A[MODE]} because you know more than I do about ${Object_A[MODE]}. <em>That isn’t what you want</em>. Now as I talk and and I can do so <em>${Mood[MODE]}</em>, I wish that you will <em>listen to me ${Mood[MODE]}</em> as I talk about the ${Object_B[MODE]} ${Object_B_add[MODE]}. That is an odd thing to talk about. It makes one <em>curious</em>. <em>Why talk about a ${Object_B[MODE]} ${Object_B_add[MODE]}?</em> ${Specific_A[MODE]} The ${Object_C[MODE]} ${Specific_B[MODE]}, <em>${Difficulty_level[MODE]} difficulty</em> in doing that because ${Specific_C[MODE]}  ${Object_A[MODE]} and ${Object_B_pl[MODE]}. That ${Adj_A[MODE]} ${Object_C[MODE]}, ${Name[MODE]}, ${Adv_A[MODE]} ${Specific_D[MODE]}, sends out a ${Adj_A[MODE]} ${Object_D[MODE]} with ${Object_E[MODE]} on it. Now you may not know what ${Object_E[MODE]} are, but ${Object_E[MODE]} are <em>things that work</em> to help the ${Object_B[MODE]} ${Object_C[MODE]} ${Action_A[MODE]}, to ${Specific_E[MODE]}, and <em>you can listen to me ${Name[MODE]}</em> so I will keep on ${Talking[MODE]} and you can keep on <em>listening, wondering, just wondering what you can really learn</em>, and here is your ${Object_F[MODE]} and your ${Object_G[MODE]} but speaking of the ${Object_B[MODE]} ${Object_B_add[MODE]}, it ${Action_A[MODE]}s so ${Adv_A[MODE]}.<em>You cannot see</em> it ${Action_A_2[MODE]}, <em>you cannot hear</em> it ${Action_A_2[MODE]}, but ${Action_A_2[MODE]} it does - ${Specific_F[MODE]}, ${Specific_G[MODE]} on the ${Object_H[MODE]}, those ${Object_J[MODE]} on the ${Object_I_pl[MODE]} too like the ${Object_K[MODE]} on the ${Object_L[MODE]}, they must make the ${Object_B[MODE]} ${Object_B_add[MODE]} <em>feel very ${Adj_B[MODE]}, very ${Mood_n[MODE]} </em> if you think of a ${Object_B_add[MODE]} as a feeling and then, <em>you can’t see</em> it ${Action_A_ing[MODE]}, <em>you can’t feel</em> it ${Action_A_ing[MODE]} but another ${Object_I[MODE]} appears on that ${Adj_A[MODE]} ${Object_B[MODE]} ${Object_H[MODE]} and then another.      … talking like a child Pg36-37 `;

console.log(answr);