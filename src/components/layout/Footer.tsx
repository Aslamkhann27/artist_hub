const Footer = () => {
  return (
    <footer className="bg-card mt-auto py-6 shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Artisan Hub. All rights reserved.</p>
        <p className="text-sm mt-1">Discover and collect unique art from talented artists around the world.</p>
      </div>
    </footer>
  );
};

export default Footer;
