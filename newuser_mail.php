<?php
include_once('../manuel/connexionmysql.php');

$retour=array('mail'=>false,'dernier'=>'','nouveau'=>'');
if(isset($_GET['mail'])){
	$sql = "SELECT * FROM `evaleleve` WHERE `ID` LIKE '".$_GET['niveau']."%' ORDER BY `ID`;";
	$eleves = $bdd->query($sql)or die(print_r($bdd->errorInfo()));
	while ($e = $eleves->fetch()){
		if($e['mail']==$_GET['mail']){$retour['mail']=$e['ID'];break;}
		foreach($e as $key =>$v){
			$eleve[$e['ID']][$key]=$v;
			
		}
		$dernier=$e['ID'];
	}
	$eleves->closeCursor();
$retour['dernier']= $dernier;

	//print_r($retour);echo $retour['mail'];
	if($retour['mail']==false){
		//print_r($retour);
		$newID=intval($dernier)+1;
		
	
		$sql = "INSERT INTO `evaleleve` (`ID`,`Nom`,`mail`) VALUES ('".$newID."','".$_GET['nom']."','".$_GET['mail']."');";
		$ajout = $bdd->query($sql)or die(print_r($bdd->errorInfo()));
		$ajout->closeCursor();
	}
	else{$newID=$retour['mail'];}
	$retour['nouveau']=$newID;
  mysql_close();	
echo json_encode($retour);

//inserer une nouvelle entree et r�cup�rer ID





$mail = $_GET['mail']; // D�claration de l'adresse de destination.

if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail)) // On filtre les serveurs qui rencontrent des bogues.
{ $passage_ligne = "\r\n";
}
else
{ $passage_ligne = "\n";}
//=====D�claration des messages au format texte et au format HTML.
$message_txt = "Bonjour ".$_GET['nom'].", tu as demand� un code Metaphysik afin de pouvoir suivre tes progr�s, le voici:".$newID."Ce code te permettra de suivre trs progr�s en sachant � tout moment ce que tu para�t ma�triser et ce qu'il reste � travailler.Attention, le niveau indiqu� n'assure pas une ma�trise compl�te des items valid�s. C'est toutefois un bon indicateur.";

$message_html = "<html><head><style>a:hover{opacity:0.8;}</style></head><body style='font-size:15px;padding:45px;font-family: Verdana;color:#2B2F3A;'>Bonjour ".$_GET['nom'].", tu as demand� un code Metaphysik afin de pouvoir suivre tes progr�s, le voici:<b> ".$newID."</b><br/><ul><li>Ce code te permettra de savoir � tout moment ce que tu para�s ma�triser et ce qu'il reste � travailler.</li>Tu peux apprendre � ton rythme</li>
<li>Recevoir � chaque fois des conseils et des infos pour am�liorer tes m�thodes de travail et ta capacit� � t'auto-�valuer.</li></ul><i>Attention, le niveau indiqu� n'assure pas une ma�trise compl�te des items valid�s. C'est toutefois un bon indicateur.</i>Pense � retenir ton code!!!<section><a href='http://metaphysik.fr/tutorat/eval.php' style='font-size:30px;padding:10px;background:#00A5D4;    border-radius:10px;display:block;text-align:center;text-decoration:none;color:black;box-shadow:1px 1px 5px;'>Aller s'�valuer</a><section></body></html>";
//=====Cr�ation de la boundary

$boundary = "-----=".md5(rand());
//=====D�finition du sujet.
$sujet = "Code Metaphysik";

//=====Cr�ation du header de l'e-mail.
$header = "From: \"M�taphysik\"<metaphysik@mail.fr>".$passage_ligne;
$header.= "Reply-to: \"M�taphysik\" <metaphysik@mail.fr>".$passage_ligne;
$header.= "MIME-Version: 1.0".$passage_ligne;
$header.= "Content-Type: multipart/alternative;".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;

//=====Cr�ation du message.
$message = $passage_ligne."--".$boundary.$passage_ligne;

//=====Ajout du message au format texte.
$message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".$passage_ligne;
$message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
$message.= $passage_ligne.$message_txt.$passage_ligne;
$message.= $passage_ligne."--".$boundary.$passage_ligne;

//=====Ajout du message au format HTML

$message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$passage_ligne;
$message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
$message.= $passage_ligne.$message_html.$passage_ligne;
$message.= $passage_ligne."--".$boundary."--".$passage_ligne;
$message.= $passage_ligne."--".$boundary."--".$passage_ligne;
//=====Envoi de l'e-mail.
mail($mail,$sujet,$message,$header);
}
?>