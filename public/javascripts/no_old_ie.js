CloudFlare.define( "no_old_ie", function( )
{
	var v = navigator.appVersion;
	
	if( v.indexOf( 'MSIE' ) != -1 && parseFloat( v.split( 'MSIE' )[ 1 ] ) <= 7 )
	{
		// TODO: Make this pretty
		
		var wrapper = document.createElement( 'div' );
		wrapper.id = 'bad_browser';
		wrapper.style.setAttribute( 'cssText', 'border-bottom:1px solid #000;background: #45484d;position:absolute;width:100%;top:0;left:0;' );
		
		wrapper.innerHTML =
			'<div id="bad_browser_info" style="text-align:center; padding:8px; line-height:150%; color:#FFF;">' +
			'	You are using outdated browser. <a href="http://abetterbrowser.org/" style="color:#EBEBF4;">More information &#187;</a>' +
			'</div>';
		
		document.body.appendChild( wrapper );
	}
} );
