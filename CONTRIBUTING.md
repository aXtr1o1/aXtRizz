# Contributing to AxtRizz

First off, thank you for considering contributing to AxtRizz! It's people like you that make AxtRizz such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide the following information:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `master` for your feature or bug fix
3. **Make your changes** in the new branch
4. **Add or update tests** as needed
5. **Ensure all tests pass** and code follows our style guidelines
6. **Update documentation** if necessary
7. **Create a pull request** with a clear title and description

## Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/axtRizz.git
   cd axtRizz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript/React Style Guide

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure your code passes ESLint checks (`npm run lint`)

### CSS Style Guide

- Use Tailwind CSS classes when possible
- Follow BEM methodology for custom CSS
- Keep styles organized and maintainable

## Testing

- Write tests for new features
- Ensure existing tests still pass
- Test your changes in different browsers
- Test responsive design on different screen sizes

## Project Structure

```
src/
├── components/          # React components
│   ├── Chatbot/        # Chat interface components
│   └── Main/           # Main layout components
├── config/             # Configuration files
├── context/            # React context providers
├── assets/             # Static assets (images, icons)
└── analytics.js        # Analytics configuration
```

## Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## Recognition

Contributors will be recognized in:
- The README.md file
- Release notes for significant contributions
- The project's contributor page

## Questions?

Don't hesitate to ask questions! You can:
- Open an issue with the `question` label
- Contact the maintainers directly
- Join our community discussions

Thank you for contributing to AxtRizz! 🚀
