function FindProxyForURL(url, host)
{
var proxy_yes = "PROXY ttc.leb.k12.in.us:62235"; 
var proxy_no = "DIRECT";
if (dnsDomainIs (host, "google.com")) { return proxy_yes; }
if (dnsDomainIs (host, "bing.com")) { return proxy_yes; }
if (dnsDomainIs (host, "bing.net")) { return proxy_yes; }
if (dnsDomainIs (host, "yahoo.com")) { return proxy_yes; }
if (dnsDomainIs (host, "youtube.com")) { return proxy_yes; }
if (dnsDomainIs (host, "yt3.ggpht.com")) { return proxy_yes; }
if (dnsDomainIs (host, "yt3.gght.com")) { return proxy_yes; }
if (dnsDomainIs (host, "ytimg.com")) { return proxy_yes; }
return proxy_yes;
}
