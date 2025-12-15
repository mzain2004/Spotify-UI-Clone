# Contributing to Spotify UI Clone

First off, thank you for considering contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🤔 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (browser, OS, etc.)

### Suggesting Enhancements ✨

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why is this enhancement useful?
- **Proposed solution**
- **Alternatives considered**

### Pull Requests 🔄

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add some AmazingFeature'`)
5. Push to your branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 💻 Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Spotify-UI-Clone.git

# Navigate to directory
cd Spotify-UI-Clone

# Open in browser or use a local server
python -m http.server 8000
```

## 🔄 Pull Request Process

1. **Update documentation** - README, comments, etc.
2. **Follow style guidelines** - consistent code style
3. **Test your changes** - ensure nothing breaks
4. **Request review** - wait for maintainer approval

### PR Title Format
```
[Type] Brief description

Types: Feature, Fix, Docs, Style, Refactor, Test, Chore
Example: [Feature] Add dark mode toggle
```

## 📝 Style Guidelines

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs after first line

Example:
```
Add dark mode feature

- Implement theme toggle button
- Add CSS variables for theming
- Save preference to localStorage

Fixes #123
```

### HTML Style Guide

```html
<!-- Use semantic HTML -->
<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
    </ul>
  </nav>
</header>

<!-- Proper indentation (2 spaces) -->
<article>
  <h1>Title</h1>
  <p>Content here</p>
</article>

<!-- Include alt text for images -->
<img src="image.jpg" alt="Description of image">
```

### CSS Style Guide

```css
/* Use meaningful class names */
.player-controls { }

/* Group related properties */
.button {
  /* Positioning */
  position: relative;
  
  /* Display & Box Model */
  display: inline-block;
  padding: 10px 20px;
  
  /* Typography */
  font-size: 16px;
  
  /* Visual */
  background-color: #1db954;
  border-radius: 4px;
}

/* Use CSS variables for theming */
:root {
  --spotify-green: #1db954;
  --spotify-black: #191414;
}
```

### JavaScript Style Guide

```javascript
// Use const/let, avoid var
const playerState = 'playing';
let currentTrack = 0;

// Use arrow functions
const playTrack = (trackId) => {
  console.log(`Playing track ${trackId}`);
};

// Use template literals
console.log(`Current track: ${currentTrack}`);

// Add comments for complex logic
// Calculate progress percentage for progress bar
const progress = (currentTime / duration) * 100;
```

## ✅ Checklist Before Submitting PR

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated (if applicable)
- [ ] All tests passing
- [ ] Screenshots added (for UI changes)

## 🆘 Need Help?

- Check existing issues and documentation
- Ask questions in issue discussions
- Reach out to [@mzain2004](https://github.com/mzain2004)

## 🙏 Thank You!

Your contributions make this project better for everyone!

---

**Happy Coding!** 💻✨