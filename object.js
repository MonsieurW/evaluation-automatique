

latable='plante2';latabletemp='plantetemp';//plantetest,plantetemptest
//plante2/plantetemp


//froid<span class="awsm">&#xf069;</span>



if (typeof Object.create != 'function') {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}
lgMois=40;decalage=12;keysSorted='';//largeur d'un mois
tab={'table':latable};plante={};plantetemp={};

champsdb={
		'associe':{
			type:'plant',expl:'Bons compagnons: ',img:'&#xf164;',width:500,gpe:'compagnons',vizib:'oui'},
		'antiassocie':{
			type:'plant',expl:'Associations néfastes: ',img:'&#xf165;',width:500,gpe:'compagnons',vizib:'oui'},
		'commentaire':{
			expl:'Commentaire',type:'text',img:'',avt:'',aps:'',gpe:'autres' ,vizib:'oui'} ,
		'conservalimt': {
			expl:"Conservation de l'aliment",type:'nbr',img:'' ,gpe:'vies',vizib:'peu',avt:'',aps:'jours'},	
		'drang':{
			expl:'espacement dans le rang',type:'nbr',clr:'#D8D5D5',img:'',avt:'&#xf07e;',aps:'cm',gpe:'semis',vizib:'peu'} , 
		'dligne':{
			expl:'espacement dans la ligne',type:'nbr',clr:'#D8D5D5',img:'',avt:'&#xf07d;',aps:'cm',gpe:'semis',vizib:'oui'} ,
		
		'eau':{
			type:'color',expl:'sol ',clr:["",'#BFBB00','brown','#FF0000'],img:'&#xf1b3;',lgd:["",'sableux/léger','équilibré','argileux/lourd'],gpe:'sol',vizib:'oui'},
		'famille':{
			type:'text',avt:'',aps:'',expl:'famille ',gpe:'noms',vizib:'oui'},	
		
		
		'hauteur':{
			expl:'hauteur ',type:'nbr',avt:'&#xf07d;',aps:'cm',gpe:'enver',vizib:'oui'},
		'largeur':{
			expl:'largeur ',type:'nbr',avt:'&#xf07e;',aps:'cm',gpe:'enver',vizib:'oui'},
		'moistaille':{type:'mois',img:'T',expl:'Taille ',gpe:'calendar',vizib:'oui'},	
		'moisflo':{
			type:'mois',img:'&#xf1e9;',expl:'Floraison ',top:10,gpe:'calendar',vizib:'oui'},
		'multi':{
			expl:'multiplication par ',type:'multiindex',lgd:['','bouture','division','greffe','marcottage','rejet','semis','semis spontané'],gpe:'vies',vizib:'oui'},
		'nom':{
			type:'text',avt:'',aps:'',expl:'nom usuel ',gpe:'noms',vizib:'oui'},
		'nomlatin':{
			type:'text',avt:'',aps:'',expl:'nom scientifique ',gpe:'noms',vizib:'peu'},			
		'pH':{
			type:'color',clr:['','red','green','blue'],img:'pH',expl:'pH ',lgd:["",'acide','neutre','basique'],gpe:'sol',vizib:'oui'},
		
		
		'prof':{
			expl:'profondeur ',type:'nbr',avt:'&#xf175;',aps:'cm',gpe:'semis',vizib:'oui'},
		'racine':{
			type:'picto',expl:'racine ',lgd:["",'pivotante','traçante','fasciculée'],img:["",'Y','W','^'],gpe:'solriche',vizib:'oui'},	
		'recolteDeb':{
			type:'mois',img:'Rd',expl:'Début de la récolte ',gpe:'calendar',vizib:'non'},
		'recolteFin':{
			type:'mois',img:'Rf',expl:'Fin de la récolte ',gpe:'calendar',vizib:'non'},
		'RECOLTE':{
			type:'periode',debPer:'recolteDeb',finPer:'recolteFin',img:'<img src="img/rcolte.png" alt="récolte">',expl:'Récolte: ',top:22,gpe:'calendar',vizib:'oui'},
		'rendement':{
			expl:'Nombre de kg/m² lors de la récolte',type:'nbr',img:'' ,avt:'',aps:'kg/m²',gpe:'sol',vizib:'oui'},
		'repiq':{
			type:'mois',img:'Rq',expl:'Repiquage ',top:11,gpe:'calendar',vizib:'oui'},
		'semisext':{
			type:'mois',img:'<img src="img/semiext.png" alt="semis exterieur"/>',expl:'Semis extérieur ',top:0,gpe:'calendar',vizib:'oui'},
		'semisabri':{
			type:'mois',img:'Sa',expl:'Semis abri ',top:0,gpe:'calendar',vizib:'oui'},
		'semisint':{
			type:'mois',img:'Si',expl:'Semis intérieur ',top:0,gpe:'calendar',vizib:'oui'},
		'solriche':{
			type:'picto',expl:'besoins en nutriments ',lgd:['','faibles','moyens','élevés'],img:['','&#xf006;','&#xf123;','&#xf005;'],gpe:'solriche',vizib:'oui'},
		
		'soleil':{
			type:'picto',expl:'ensoleillement ',lgd:['','important','moyen','faible'],img:["",'&#xf185;','&#xf185;/&#xf0c2;','&#xf0c2;'],gpe:'soleil',vizib:'oui'},
		
	
		'Tmin':{
			expl:'Température mini=',type:'nbrnul',avt:'&#xf069;',aps:'°C',gpe:'soleil',vizib:'oui'},
		
		'tpslevee':{
			expl:'Nombre de jours de la graine à la plantule',type:'nbr',img:'',avt:'lève en ',aps:'jours',gpe:'semis',vizib:'peu' } ,
		 'tpsconserv':{
			expl:'Durée de conservation des semences',type:'nbr',img:'',gpe:'autres',vizib:'oui',avt:'',aps:'ans' } ,
		'usagemedic':{
			expl:'usage médical: ',type:'multiindex',lgd:['','Anesthésiant','Antiseptique','Anti-inflammatoire','Astringent','Cœur et vaisseaux','Coupe-faim','Dermatologie','Digestion','Diététique','Diurétique','Insomnie','Lactation','Œdème','Parasites','Poumons','Sédatif','Sclérose','Vulnéraire'],gpe:'util',vizib:'oui'},	
		'utilisation':{
			expl:'Utilisations de la plante',type:'multiindex',lgd:['','bois de chauffe','bois d\'oeuvre','construction','couverture hiver','engrais','fertilisateur de sol','insecticide','paillage','refuge d\'insecte','vannerie/textile','parfum','brise-vent'],gpe:'util',vizib:'oui'} ,
		'type':{
			expl:'comestible: ',type:'pictomulti',lgd:['','feuille','fruit','fleur','racine','tige/sève'],img:['','&#xf06c;','&#xf094;','&#xf1e9;','&radic;','I'],gpe:'vies',vizib:'oui'},
		'vie':{
			type:'nbr',avt:'',aps:'an(s)',expl:'espérance de vie ',gpe:'vies',vizib:'oui'},
		'vivace':{
			type:'bool',1:'vivace&#xf0e2;',0:"annuelle",expl:'Caractère vivace ',gpe:'vies',vizib:'oui'}
};

titreschoisis=['noms','vies','calendar','solriche','enver','soleil','compagnons','sol','util','semis','autres'];
titres={//quelles sont les différentes cases et leurs contenus
	noms:{
		desc:'Nom',colorbox:'#EFEFEF'},
	vies:{
		desc:'Durée de vie',colorbox:'#54CEAD'},
	calendar:{
		desc:'Calendrier',colorbox:'#3EF53E'},
	solriche:{
		desc:'Occupation du sol ',colorbox:'#FFA500'},
	enver:{
		desc:'Envergure',colorbox:'#F53E82'},
	soleil:{
		desc:'Ensoleillement ',colorbox:'#54CEAD'},
	compagnons:{
		desc:'compagnonage',colorbox:'#71EAAE'},
	sol:{
		desc:'Sol',colorbox:'#E8ADAD'},
	util:{
		desc:'Utilité',colorbox:'#E0ADAD'},
	semis:{
		desc:'Semis',colorbox:'#D8D5D5'},
	autres:{
		desc:'Autres',colorbox:'#E0ADAD'}
		
};
blocss={};
for(var champ in champsdb){
				var nombloc=champsdb[champ]['gpe'];
				if(blocss[nombloc]){}
				else blocss[nombloc]=[];
				blocss[nombloc].push(champ);
}




criteretri={
	'famille':'text',	
	'hauteur':'nbr',
	'eau':'nbr',
	'pH':'nbr',
	'soleil':'nbr'
};


criterefiltre={
	'semisext':{expl:"Semis exterieur",
		typ:'val',values:{
			1:"Janvier",2:"Février", 3:"Mars",4:"Avril",5:"Mai",6:"Juin",7:"Juillet",8:"Août",9:"Septembre",10:"Octobre",11:"Novembre",12:"Décembre"}},	
	'recolte':{expl:"Récolte",
		typ:'period',deb:'recolteDeb',fin:'recolteFin',values:{1:"Janvier",2:"Février", 3:"Mars",4:"Avril",5:"Mai",6:"Juin",7:"Juillet",8:"Août",9:"Septembre",10:"Octobre",11:"Novembre",12:"Décembre"}},
	'vivace':{expl:'Vivace?',
		typ:'val',values:{0:'annuelle',1:'vivace'}},
	'hauteur':{expl:'Hauteur',
		typ:'categorie',values:{'0_15':'couvre-sol',
					'15_100':'petite plante',
					'100_200':'arbuste',
					'200_10000':'arbre'}},
	'utilisation':{expl:"Besoin en nutriments",
				typ:'val',values:{
					1:'faible',2:'moyen',3:'élevé'}},	
	'usagemedic':{
			expl:'Medicinal ',typ:'val',values:{0:'',1:'Anesthésiant',2:'Antiseptique',3:'Anti-inflammatoire',4:'Astringent',5:'Cœur et vaisseaux',6:'Coupe-faim',7:'Dermatologie',8:'Digestion',9:'Diététique',10:'Diurétique',11:'Insomnie',12:'Lactation',13:'Œdème',14:'Parasites',15:'Poumons',16:'Sédatif',17:'Sclérose',18:'Vulnéraire'}},	
	'utilisation':{
			expl:'Utilisation ',typ:'multiindex',values:{0:'',1:'bois de chauffe',2:'bois d\'oeuvre',3:'construction',4:'couverture hiver',5:'engrais',6:'fertilisateur de sol',7:'insecticide',8:'paillage',9:'refuge d\'insecte',10:'vannerie/textile'}} ,	
	'solriche':{expl:"Besoin en nutriments",
				typ:'val',values:{
					1:'faible',2:'moyen',3:'élevé'}},
	
};



nvlentree='<tr><h6><span>Nouvelle plante </span><span class="famille">Inconnue</span></h6><div><span class="awsm edit" id="NULL" style="margin-left: 200px;">&#xf044;</span></tr>';

mois={0:'',1:"Janvier",2:"Février", 3:"Mars",4:"Avril",5:"Mai",6:"Juin",7:"Juillet",8:"Août",9:"Septembre",10:"Octobre",11:"Novembre",12:"Décembre"};


function generer_chps_acqu(p,pt){
	comp=(pt!=0)?1:0;
	//html="";
	//console.log(p);
	for(var b in titres){
	for(var i in blocss[b]){	
		Chp=blocss[b][i];
		clrBx=titres[champsdb[Chp]['gpe']]['colorbox'];
		diff="differe";
		
		propChamp=champsdb[Chp];//console.log(propChamp);
		if(propChamp['type']!='periode'){
			w=(propChamp['width'])?'width:'+propChamp['width']+'px;':'';
			if(comp)diff=(p[Chp]==pt[Chp])?"pareil":"differe";
			html+='<div class="'+Chp+' '+diff+'" style="'+w+'background:'+clrBx+'" id="'+Chp+'">'+propChamp['expl'];
			switch(propChamp['type']){
				case 'mois':
					html+='<select name="'+Chp+'">';
					for(var m in mois){
						html+='<option value="'+m+'"';
						if(p[Chp]==m)html+=' selected="selected"';	
						html+='>'+mois[m]+'</option>';
					}
					html+='</select>'; 
				break;
				
				case 'picto':
				html+='<select name="'+Chp+'">';
					for(var i in propChamp['lgd']){
						html+='<option value="'+i+'"';
						if(p[Chp]==i)html+=' selected="selected"';	
						html+='>'+propChamp['lgd'][i];
						html+=(propChamp['img'])?propChamp['img'][i]:'';
						html+='</option>';
					}
					html+='</select>'; 
				break;
				case 'color':
				html+='<select name="'+Chp+'">';
					for(var i in propChamp['lgd']){
						html+='<option style="color:'+propChamp['clr'][i]+'" value="'+i+'"';
						if(p[Chp]==i)html+=' selected="selected"';	
						html+='>'+propChamp['lgd'][i]+'</option>';
					}
					html+='</select>'; 
				break;
				
				case 'pictomulti':
					splited=p[Chp].split('_');
					for(var i in propChamp['lgd']){
						if(i!=0){html+='<label><input class="chk" type="checkbox" name="'+Chp+'" value="'+propChamp['lgd'][i]+'"';
						if($.inArray(propChamp['lgd'][i],splited)!=-1)html+=' checked';	
						html+='>'+propChamp['lgd'][i]+propChamp['img'][i]+'</label>';}
					} 
				break;
				case 'multiindex':
					splited=p[Chp].split('_');
					for(var i in propChamp['lgd']){
						if(i!=0){html+='<label><input class="chk" type="checkbox" name="'+Chp+'" value="'+i+'"';
						if($.inArray(i,splited)!=-1)html+=' checked';	
						html+='>'+propChamp['lgd'][i]+'</label>';}
					} 
				break;

				case 'bool':
					html+=(propChamp['img'])?propChamp['img']:'';
					html+='<select name="'+Chp+'">';
					html+='<option value="0"';
					if(p[Chp]==0)html+=' selected="selected"';	
					html+='>'+propChamp[0]+'</option><option value="1"';
					if(p[Chp]==1)html+=' selected="selected"';	
					html+='>'+propChamp[1]+'</option>';
					html+='</select>'; 
				break;
				
				
				case 'typlant':
				typesss=p[Chp].split('_');
				for(var i in typlant){
						html+='<label><input class="chk" type="checkbox" name="'+Chp+'" value="'+i+'"';
						if($.inArray(typlant[i],typesss)!=-1)html+=' checked';	
						html+='>'+i+'</label>';
					}
				break;
				
				
				case 'plant':
				autresplantes=p[Chp].split('_');
				famille=plante[keysSorted[0]]['famille'].toLowerCase();num_famille=0;html2="";html3="";
				for(k in keysSortedFamille){
					if(plante[keysSorted[k]]['famille'].toLowerCase()!=famille){
						famille=plante[keysSorted[k]]['famille'].toLowerCase();num_famille++;}
						html2+='<label class="f'+num_famille+'"><input class="chk" type="checkbox" name="'+Chp+'" value="'+plante[keysSorted[k]].ID+'"';
						if($.inArray(plante[keysSorted[k]].ID,autresplantes)!=-1)html2+=' checked';	
						html2+='>'+plante[keysSorted[k]].nom+'</label>';
						//html3+=plante[keysSorted[k]].nom+', ';
					}
				html+='<img class="deroul" src="../commun/img/plusspetit.png"><div class="tiroir">'+html2;
				html+='</div>';	
				break;
				
				default:
				html+='('+propChamp['aps']+')';
				html+=(propChamp['img'])?propChamp['img']:'';
				html+='<input type="text" name="'+Chp+'" placeholder="'+propChamp['expl']+'('+propChamp['aps']+')" value="'+p[Chp]+'">';
				break;
				
			}
		html+='</div>';
		}
	}	
	}
}	

function recup_donnees($obj,typ){
	value='';
		switch(typ){
			case 'color':
			case 'bool':
			case 'mois':
			case 'picto':
				value=$obj.find('select option:selected').attr('value');
			break;
			case 'pictomulti':
			case 'multiindex':
				$obj.find('input:checked').each(function(index){
					value+=$(this).attr('value')+'_';
				});
			break;
			case 'plant':
				$obj.find('input:checked').each(function(index){
					value+=$(this).attr('value')+'_';
				});
			break;
			default:
				value=$obj.find('input').val();
			break;
		}//console.log(value);
		return value;
	}

function clefsordonnees(critere){console.log('trie');
	return 	Object.keys(plante).sort(function(a,b){
		return plante[a][critere].toLowerCase().localeCompare(plante[b][critere].toLowerCase());
	});
}
function clefsordonneesnbr(critere){
	return 	Object.keys(plante).sort(function(a,b){
		critera=(plante[a][critere]!="")?parseInt(plante[a][critere]):0;
		criterb=(plante[b][critere]!="")?parseInt(plante[b][critere]):0;
		return critera-criterb;
	});
}

/*function aide(){
contenu="<h1>Bienvenue sur le plantator!</h1>Tu peux obtenir des informations en cliquant sur ce que tu ne comprends pas.<br/>Dans le plantator, tout est open-source et libre de droit! Si tu es motivé pour aider <a style='color:cyan' href='http://padlet.com/adressedallan/w54pkq3y9p75'>viens voir par là</a> ou <a href='http://padlet.com/adressedallan/mrgogmsycyur'>t'exprimer par là</a> <br/>Tu peux compléter les infos manquantes grâce au bouton <span class='awsm edit' style='display:inline'>'"+pictos.edition+"'</span> pour faire plaisir aux suivants! Pour la recherche d'un nom particulier tape Control+F (sous Windows) ou Cmd+F (sous Mac)";
affchbulle(contenu,$('#logo'),'titre')

}
*/
/*function affchbulle(contenu,obj,type){
	$('.actif').removeClass('actif');
	obj.addClass('actif');
	x=obj.offset().left;
	if(type=='titre'){
	content='<div style="left:'+x+'px;top:59px;position:fixed">'+contenu+'<span id="close">X</span></div>';
	}
	else{
	y=obj.offset().top;//console.log(x+','+y);
	content='<div style="left:'+x+'px;top:'+(y+40)+'px">'+contenu
	+'<span id="close">X</span></div>';}
	$('#comment').html(content);
}
*/
	